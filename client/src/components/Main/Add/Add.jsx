import React, { useState } from 'react';
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css';
import inst from "./inst.js";
import styles from "./styles.module.css";
import axios from 'axios';
import { useMediaQuery } from "react-responsive";

const Add = ({ uid }) => {
    const [query, setQuery] = useState({
        numarDosar: "",
        numeParte: "",
        institutie: ""
    })

    var months = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie",
        "august", "septembrie", "octombrie", "noiembrie", "decembrie"];

    const [dosare, setDosare] = useState([])
    const [error, setError] = useState("");
    const isMobile = useMediaQuery({ query: `(max-width: 1115px)`})
    const [loadingResults, setLoadingResults] = useState(false); 
    const [pushed, setPushed] = useState({state: true, index: -1});

    const [expanded, setExpanded] = useState([]);

    const toggleExpand = (cardIndex, section) => {
        setExpanded((prevExpanded) =>
            prevExpanded.map((card, index) =>
                index === cardIndex
                ? { ...card, [section]: !card[section] } // Toggle the specific section
                : card
            )
        );
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoadingResults(true);

        if (query.numarDosar == "" && query.numeParte == "" && query.institutie == "") {
            alert("Completati cel putin o casuta!");
            setLoadingResults(false);
            return;
        }
        
        try {
            setError("")
            // const url = "http://localhost:8080/api/search";
            const url = "https://accomplished-nourishment-production.up.railway.app/api/search"
            const res = await axios.post(url, query, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });

            setDosare(res.data);
            res.data.forEach(() => {
                var temp = expanded;
                temp.push({
                    title1: false,
                });
                setExpanded(temp);
            });

            // for (let index = 0; index < res.data.length; index++) {
            //     open.push(false)
            // }
        } catch (error) {
            if (error.response && 
                error.response.status >= 400 && 
                error.response.status <= 500
            ) {
                console.log(error)
                if (error.response.data.message == "noResult") setError("No results found!")
                else setError(error.response.data.message)
            }
        }

        setLoadingResults(false);
    }

    async function handlePush(e, dosar, index) {
        e.preventDefault()
        setPushed({state: false, index: index});

        try {
            setError("")
            // const url = "http://localhost:8080/api/push";
            const url = "https://accomplished-nourishment-production.up.railway.app/api/push"
            
            const res = await axios.post(url, {
                userid: uid,
                numardosar: dosar.numar,
                institutie: dosar.institutie,
                dosardata: dosar,
                lastsync: new Date(Date.now())
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });   
            console.log(res.message)
        } catch (error) {
            if (error.response && 
                error.response.status >= 400 && 
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
                console.log(error.response.data.message)
            }
        }
        setPushed({state: true, index: -1});
    }

    return (
        <div className={styles.container + " container px-auto py-4"}>
            <div>
                {error && <div className={styles.error_msg}>{error}</div>}
                <h1>Adaugare Dosare</h1>
                <form className={!isMobile ? "flex flex-row items-end justify-between" : "w-100"} onSubmit={handleSubmit}>
                    <div className={!isMobile ? 'flex flex-row items-center justify-start' : ''}>
                        <div className={`form-group mt-2 ${!isMobile ? "mr-3" : ""}`}>
                            <label htmlFor="numarDosar">Numar Dosar</label>
                            <input type="text" className="form-control" placeholder="Numar Dosar" onChange={e => setQuery({...query, numarDosar: e.target.value})} />
                        </div>
                        <div className={`form-group mt-2 ${!isMobile ? "mr-3" : ""}`}>
                            <label htmlFor="numeParte">Nume Parte / Parti</label>
                            <input type="text" className="form-control" placeholder="Nume" onChange={e => setQuery({...query, numeParte: e.target.value})}/>
                        </div>
                        <div className={`form-group mt-2 ${!isMobile ? "mr-3" : ""}`}>
                            <label htmlFor="institutie">Instanta</label>
                            <select className="form-select" value={query.institutie} onChange={e => setQuery({...query, institutie: e.target.value})}>
                                <option></option>
                                {
                                    Object.keys(inst).sort().map((key) => <option key={key}>{inst[key]}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Cautare</button>
                </form>
            </div>
            
            <div className="mb-3 mt-4 pb-2 flex items-center justify-start border-bottom ">{!isMobile ? <h3>Rezultatele Cautarii</h3> : <h5 className='m-0'>Rezultatele Cautarii</h5>}</div>
            <div className=''>
                {!loadingResults ? <>
                    {
                        dosare.map((dosar, index) => {
                            return (
                                <div className="mb-4" key={index}>
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            {/* Titles at the Top */}
                                            <div className="mb-4">
                                                <h6 className="text-muted">{dosar.institutie}</h6>
                                                <h3 className="mb-3">{`DOSAR NR. ${dosar.numar}`}</h3>
                                                <h6 className="text-muted">{"Ultima modificare - " + new Date(dosar.dataModificare.replace("Z", "")).getDate() + " " + months[new Date(dosar.dataModificare.replace("Z", "")).getMonth()] + " " + new Date(dosar.dataModificare.replace("Z", "")).getFullYear() + " | " + ('0' + new Date(dosar.dataModificare.replace("Z", "")).getHours()).slice(-2) + ":" + ('0' + new Date(dosar.dataModificare.replace("Z", "")).getMinutes()).slice(-2)}</h6>
                                            </div>

                                            {/* Title 1 Section */}
                                            <div className="mb-4">
                                                <h4 className="mb-3">Parti</h4>
                                                <div className="row">
                                                    {expanded[index].title1 && (
                                                        <>
                                                            {typeof dosar.parti != "undefined" ? (
                                                                <>
                                                                    {dosar.parti.DosarParte.map((parte, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                <div className="card mb-3">
                                                                                    <div className="card-body d-flex items-center justify-between">
                                                                                        {/* Left Text Section */}
                                                                                        <div className="flex pe-3">
                                                                                            <p className="card-text text-wrap">{parte.nume}</p>
                                                                                        </div>

                                                                                        {/* Right Text Section */}
                                                                                        <div className="flex ps-3">
                                                                                            <p className="card-text text-muted">{parte.calitateParte}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </>
                                                            ) : <p>-</p>}
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

                                            {/* Footer Section */}
                                            <div className="mt-4">
                                                <div className="d-flex justify-center align-items-center">
                                                    <div>
                                                        <button className="btn btn-primary my-2 mr-2" onClick={e => handlePush(e, dosar, index)}>{!pushed.state && index == pushed.index ? "Se adauga..." : "Adaugare in lista de dosare"}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </> : <p>Loading...</p>}
            </div>
        </div>
    )
}

Add.propTypes = {
    uid: PropTypes.string.isRequired
}

export default Add;