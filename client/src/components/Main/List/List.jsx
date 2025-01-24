import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css"
import Sedinta from '../Sedinta/Sedinta';

const List = ({ userid, f }) => {
    const [dosare, setDosare] = useState([])
    const [error, setError] = useState("");
    const [deleted, setDeleted] = useState(true)
    const [finished, setFinished] = useState(false);
    const [refreshed, setRefreshed] = useState({state: true, index: -1});
    const [viewSedinta, setViewSedinta] = useState(false);
    const [propsToPass, setPropsToPass] = useState([])
    const [bold, setBold] = useState("");
    const [oraBold, setOraBold] = useState("");
    const [expanded, setExpanded] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [startedSearching, setStartedSearching] = useState(false);

    const toggleExpand = (cardIndex, section) => {
        setExpanded((prevExpanded) =>
            prevExpanded.map((card, index) =>
                index === cardIndex
                ? { ...card, [section]: !card[section] } // Toggle the specific section
                : card
            )
        );
    };

    var months = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie",
        "august", "septembrie", "octombrie", "noiembrie", "decembrie"];

    function convertDate(toBeConverted) {
        let gmtDate = typeof toBeConverted == "string" ? new Date(toBeConverted) : toBeConverted instanceof Date ? toBeConverted : null;
    
        let bucharestOptions = { timeZone: 'Europe/Bucharest', hour12: false };
        let year = gmtDate.toLocaleString('en-GB', { ...bucharestOptions, year: 'numeric' });
        let month = gmtDate.toLocaleString('en-GB', { ...bucharestOptions, month: '2-digit' });
        let day = gmtDate.toLocaleString('en-GB', { ...bucharestOptions, day: '2-digit' });
        let hour = gmtDate.toLocaleString('en-GB', { ...bucharestOptions, hour: '2-digit', hour12: false });
        let minute = gmtDate.toLocaleString('en-GB', { ...bucharestOptions, minute: '2-digit' });
        let second = gmtDate.toLocaleString('en-GB', { ...bucharestOptions, second: '2-digit' });
    
        return `${year}-${month}-${day}T${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}:${('0' + second).slice(-2)}.000Z`;
    }

    function find(arr, numar) {
        arr.forEach((sedinta) => {
            if (typeof sedinta.dosare != "undefined") {
                sedinta.dosare.SedintaDosar.forEach(element => {
                    if (element.numar == numar) {
                        var toBeReturned = sedinta.dosare.SedintaDosar
                        toBeReturned.sort((a, b) => a.ora.localeCompare(b.ora));
                        setPropsToPass(toBeReturned);
                    }
                });
            }
        })   
    }

    useEffect(() => {
        try {
            if (deleted) {
                setDeleted(false)
                setFinished(false);
                // const url = "http://localhost:8080/api/list";
                const url = "https://accomplished-nourishment-production.up.railway.app/api/list"

                axios.post(url, {
                    uid: userid,
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }).then(response => {
                    setDosare(response.data.data)
                    response.data.data.forEach(() => {
                        var temp = expanded;
                        temp.push({
                            title1: false,
                            title2: false,
                        });
                        setExpanded(temp);
                    });
                    setSearchResult(response.data.data)
                    setFinished(true);
                });
            }
        } catch (error) {
            if (error.response && 
                error.response.status >= 400 && 
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
                console.log(error.response.data.message)
            }
        }
    }, [deleted])

    async function handleDelete(dosar) {
        try {
            setError('')
            // const url = "http://localhost:8080/api/delete";
            const url = "https://accomplished-nourishment-production.up.railway.app/api/delete"

            const res = await axios.post(url, {
                uid: userid,
                numardosar: dosar.numar,
                institutie: dosar.institutie
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })

            console.log(res.data.message)

            setDeleted(true);
        } catch (error) {
            setError(error.response.data.message);
            console.log(error.response.data.message);
        }
    }

    async function handleRefresh(dosar, index) {
        setRefreshed({state: false, index: index});
        try {
            setError("")
            // const url = "http://localhost:8080/api/refresh";
            const url = "https://accomplished-nourishment-production.up.railway.app/api/refresh"

            const res = await axios.post(url, {
                userid: userid,
                numardosar: dosar.numar,
                institutie: dosar.institutie
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })

            console.log(res.data.message)

            setDeleted(true);
        } catch (error) {
            setError(error.response.data.message);
            console.log(error.response.data.message);
        }
        setRefreshed({state: true, index: -1});
    }

    function viewSedinte(dataSedinta, institutie, numar, ora) {
        setViewSedinta(true);
        setFinished(false);

        const url = "https://accomplished-nourishment-production.up.railway.app/api/listasedinta"

        axios.post(url, {
            dataSedinta: dataSedinta,
            institutie: institutie,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            find(response.data, numar)
            setBold(numar)
            setOraBold(ora);
            setFinished(true);
        }); 
    }

    function handleSearch(query) {
        setStartedSearching(true);

        query = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (!query.trim()) {
            setStartedSearching(false);
            setSearchResult(dosare)
            return;
        }

        setSearchResult([]);
          
        const tempResults = [];
        const seenParents = new Set()
        
        const searchKeys = ['numar', 'institutie', 'nume'];  

        function searchInObject(obj, parent) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var value = obj[key];

                    if (typeof value === 'string') value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
                    if (searchKeys.includes(key) && typeof value === 'string' && value.toLowerCase().includes(key == "institutie" ? query.replace(/\s+/g, '').toLowerCase() : query.toLowerCase())) {
                        const parentId = JSON.stringify(parent);
                        if (!seenParents.has(parentId)) {
                            seenParents.add(parentId);  
                            tempResults.push(parent);   
                        }
                        return; 
                    }
            
                    if (Array.isArray(value)) {
                        for (var item of value) {
                            if (typeof item === 'string') item = item.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

                            if (typeof item === 'object' && item !== null) {
                                searchInObject(item, parent);
                            } else if (typeof item === 'string' && item.toLowerCase().includes(key == "institutie" ? query.replace(/\s+/g, '').toLowerCase() : query.toLowerCase())) {
                                const parentId = JSON.stringify(parent);  
                                if (!seenParents.has(parentId)) {
                                    seenParents.add(parentId);  
                                    tempResults.push(parent);   
                                }
                            }
                        }
                    }
            
                    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                        searchInObject(value, parent);
                    }
                }
            }
        }
          
        dosare.forEach(item => searchInObject(item, item));
        
        setSearchResult(tempResults);
        
    }

    if (finished ) return (
        viewSedinta ? <Sedinta data={propsToPass} changeView={setViewSedinta} numar={bold} ora={oraBold} /> : <div className={styles.container + " container px-auto py-4"}>
            {error && <div className={styles.error_msg}>{error}</div>}
            <div className='flex flex-column items-center justify-between'>
                <h1>Lista Dosare</h1>
                <input type="text" className="form-control my-2" placeholder="Search..." aria-label="Search" onChange={e => handleSearch(e.target.value)} />
                {startedSearching ? <p>{searchResult.length == 1 ? "S-a gasit 1 rezultat" : "S-au gasit " + searchResult.length + " rezultate"}</p> : <></>}
            </div>
            
            {searchResult.length > 0 ? 
                <>
                    {
                        searchResult.map((d, index) => {
                            let dosar = d.dosardata;
                            let last = d.lastsync;
                            return (
                                <>
                                <div className=" my-4" key={index}>
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            {/* Titles at the Top */}
                                            <div className="mb-4">
                                                <h6 className="text-muted">{dosar.institutie}</h6>
                                                <h3 className="mb-3">{"DOSAR NR. " + dosar.numar}</h3>
                                                <h6 className="text-muted">{"Ultima modificare - " + new Date(dosar.dataModificare.replace("Z", "")).getDate() + " " + months[new Date(dosar.dataModificare.replace("Z", "")).getMonth()] + " " + new Date(dosar.dataModificare.replace("Z", "")).getFullYear() + " | " + ('0' + new Date(dosar.dataModificare.replace("Z", "")).getHours()).slice(-2) + ":" + ('0' + new Date(dosar.dataModificare.replace("Z", "")).getMinutes()).slice(-2)}</h6>
                                            </div>

                                            {/* Title 1 Section */}
                                            <div className="mb-4">
                                                <h4 className="mb-3">Parti</h4>
                                                <div>
                                                    {expanded[index].title1 && (
                                                        <>
                                                            {typeof dosar.parti != "undefined" ? <>
                                                                {
                                                                    dosar.parti.DosarParte.map((parte, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <div className="card mb-3">
                                                                                    <div className="card-body d-flex items-center justify-between">
                                                                                        {/* Left Text Section */}
                                                                                        <div className="flex pe-3">
                                                                                            <p className="card-text text-wrap">{parte.nume}</p>
                                                                                        </div>

                                                                                        <div className='border-end'>{" "}</div>
                                    
                                                                                        {/* Right Text Section */}
                                                                                        <div className="flex ps-3">
                                                                                            <p className="card-text text-muted">{parte.calitateParte}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                } </> : <p>-</p>
                                                            }
                                                        </>
                                                    )}
                                                    <div className="text-center">
                                                        <button
                                                            className="btn btn-link"
                                                            onClick={() => toggleExpand(index, "title1")}
                                                        >
                                                            {expanded[index].title1 ? "Ascunde Lista Parti" : "Vezi Lista Parti"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Title 2 Section */}
                                            <div className="mb-4">
                                                <h4 className="mb-3">Sedinte</h4>
                                                <div className="row">
                                                    {expanded[index].title2 && (
                                                    <>
                                                        {typeof dosar.sedinte != "undefined" ? <> {
                                                            dosar.sedinte.DosarSedinta.map((sedinta, index) => {
                                                                return (
                                                                    <div>
                                                                        <div className="card mb-3">
                                                                            <div className="card-body">
                                                                                {/* First Text Section */}
                                                                                <div className="mb-3 pb-3 border-bottom">
                                                                                    <h5 className="card-text">{('0' + new Date(convertDate(sedinta.data)).getDate()).slice(-2) + " " + months[new Date(sedinta.data).getMonth()] + " " + new Date(sedinta.data).getFullYear() + " | " + sedinta.ora}</h5>
                                                                                </div>

                                                                                {/* Second Text Section */}
                                                                                <div className="mb-3 pb-3 border-bottom">
                                                                                    <p className="card-text">{sedinta.solutie + " - " + sedinta.solutieSumar}</p>
                                                                                </div>

                                                                                {/* Button Section */}
                                                                                <div className="text-center">
                                                                                    <button className="btn btn-primary" onClick={() => viewSedinte(sedinta.data, dosar.institutie, dosar.numar, sedinta.ora)}>Lista de Sedinta</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        } </> : <p>-</p>}
                                                    </>
                                                    )}
                                                    <div className="text-center">
                                                        <button
                                                            className="btn btn-link"
                                                            onClick={() => toggleExpand(index, "title2")}
                                                        >
                                                            {expanded[index].title2 ? "Ascunde Lista Sedinte" : "Vezi Lista Sedinte"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer Section */}
                                            <div className="mt-4">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <button className="btn btn-danger my-2 mr-2" onClick={e => handleDelete(dosar)}>Sterge</button>
                                                        <button className="btn btn-success my-2 mr-2" onClick={e => handleRefresh(dosar, index)}>{!refreshed.state && index == refreshed.index ? "Refreshing..." : "Refresh"}</button>
                                                    </div>
                                                    <div>
                                                        <p className="fst-italic mb-0">
                                                            {"Last refreshed: " + new Date(last).getDate() + " " + months[new Date(last).getMonth()] + " " + new Date(last).getFullYear() + " | " + ('0' + new Date(last).getHours()).slice(-2) + ":" + ('0' + new Date(last).getMinutes()).slice(-2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            )
                        })
                    }
                </> : <></>}
        </div>
    )
    else return (
        <div className={styles.container + " container px-auto py-4"}>
            <p>Loading...</p>
        </div>
    )
}

export default List;