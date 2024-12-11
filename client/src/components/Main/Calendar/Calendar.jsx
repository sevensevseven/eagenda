import React from 'react'
import { Calendar } from "antd"; 
import styles from "./styles.module.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useMemo } from 'react';
import Sedinta from '../Sedinta/Sedinta';

const Event = ({ userid, sedinte, setViewSedinta, setBold, setPropsToPass, setFinished, setOraBold }) => {
    const [notiteArr, setNotiteArr] = useState([]);
    const [savingArr, setSavingArr] = useState([]);
    const [done, setDone] = useState(false);

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

    useMemo(() => {
        const url = "https://accomplished-nourishment-production.up.railway.app/api/getnotita"

        var notitaids = [];
        sedinte.forEach(element => {
            notitaids.push(`${userid.toString()}+${element.dosarnumar}+${element.ora}+${element.institutie}`)
            savingArr.push(false);
        });

        axios.post(url, {
            notitaids: notitaids
        }).then(response => {
            const temp = response.data.map(element => ({
                notitaid: element.notitaid,
                value: element.value
            }));
            setNotiteArr(temp);
            setDone(true);
        }); 
    }, [])

    function viewSedinte(dataSedinta, institutie, numar, ora) {
        setViewSedinta(true);
        setFinished(false);

        const url = "https://accomplished-nourishment-production.up.railway.app/api/listasedinta"

        axios.post(url, {
            dataSedinta: dataSedinta,
            institutie: institutie,
        }).then(response => {
            find(response.data, numar)
            setBold(numar)
            setOraBold(ora)
            setFinished(true);
        }); 
    }

    function handleSubmit(e, notitaid, index) {
        e.preventDefault()

        var temp = [...savingArr];
        temp[index] = true;
        setSavingArr(temp);

        const url = "https://accomplished-nourishment-production.up.railway.app/api/addnotita";

        axios.post(url, notiteArr[notiteArr.findIndex(element => element.notitaid == notitaid)]).then(response => {
            console.log(response)
            var temp = [...savingArr];
            temp[index] = false;
            setSavingArr(temp);
        }).catch(error => console.log(error)); 
    }
    
    return (
        <div className={styles.eventcontainer}>
            {
                sedinte.map((sedinta, index) => {
                    return (
                        <div className='mt-2 d-flex flex-column bg-light p-2 rounded-xl mb-2'>
                            <p className='my-0'><strong><span className='mx-1'>•</span>{sedinta.ora}</strong></p>
                            <div className={styles.small}>{"Numar Dosar: " + sedinta.dosarnumar}</div>
                            <div className={styles.small}>{"Locatie: " + sedinta.institutie}</div>
                            <div className={styles.small}>{"Solutie: " + sedinta.solutie}</div>
                            <button className='btn btn-success my-1' onClick={() => {viewSedinte(sedinta.data, sedinta.institutie, sedinta.dosarnumar, sedinta.ora)}}>Lista de Sedinta</button>
                            <hr />
                            {
                                done ? <>
                                    <h5>Notite</h5> 
                                    <form onSubmit={e => handleSubmit(e, `${userid.toString()}+${sedinta.dosarnumar}+${sedinta.ora}+${sedinta.institutie}`, index)}>
                                        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}} className='form-group'>
                                            <textarea className='form-control' style={{resize: "none", minHeight: 100}} onChange={e => {
                                                var temp = [...notiteArr];
                                                const i = temp.findIndex(element => element.notitaid == `${userid.toString()}+${sedinta.dosarnumar}+${sedinta.ora}+${sedinta.institutie}`)
                                                if (i == -1) temp.push({ notitaid: `${userid.toString()}+${sedinta.dosarnumar}+${sedinta.ora}+${sedinta.institutie}`, value: e.target.value})
                                                else temp[i] = {...temp[i], value: e.target.value};
                                                setNotiteArr(temp);
                                            }} 
                                            defaultValue={notiteArr[notiteArr.findIndex(element => element.notitaid == `${userid.toString()}+${sedinta.dosarnumar}+${sedinta.ora}+${sedinta.institutie}`)]?.value || ""}/>
                                            <button className='btn btn-primary my-2' type='submit'>{savingArr[index] ? "Saving..." : "Save"}</button>
                                        </div>
                                    </form>
                                </> : <p className='min-h-40'>Loading...</p>
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

function search(nameKey, myArray){
    var found = [];
    
    for (let i=0; i < myArray.length; i++) {
        if (new Date(myArray[i].data).toDateString() == nameKey) found.push(myArray[i]);
    }

    return found;
}

const AutoCalendar = ({ userid }) => {
    const [deleted, setDeleted] = useState(true)
    const [error, setError] = useState("");
    const [sedinte, setSedinte] = useState([])
    const [datestring, setDatestring] = useState(new Date(Date.now()).toDateString())
    const [found, setFound] = useState([])
    const [finished, setFinished] = useState(false);
    const [viewSedinta, setViewSedinta] = useState(false)
    const [bold, setBold] = useState("");
    const [propsToPass, setPropsToPass] = useState([]);
    const [oraBold, setOraBold] = useState("");

    function populate(callback) {
        try {   
            setDeleted(false)
            // const url = "http://localhost:8080/api/list";
            const url = "https://accomplished-nourishment-production.up.railway.app/api/list"

            axios.post(url, {
                uid: userid,
            }).then(response => {
                callback(null, response)
                
            });    
        } catch (error) {
            if (error.response && 
                error.response.status >= 400 && 
                error.response.status <= 500
            ) {
                console.log(error.response.data.message)
                callback(error, null);
            }
        }
    }

    useMemo(() => {
        populate((err, response) => {
            if (err) setError(error.response.data.message)
            else {
                response.data.data.map(d => {
                    let dosar = d.dosardata
                    if (typeof dosar.sedinte != "undefined") {
                        var arr = sedinte;
                        dosar.sedinte.DosarSedinta.map(sedinta => {
                            arr.push({
                                dosarnumar: dosar.numar,
                                institutie: dosar.institutie,
                                data: sedinta.data,
                                ora: sedinta.ora,
                                solutie: sedinta.solutie
                            })
                        })
                        setSedinte(arr);
                    }
                })
            }
            console.log("populated")
            setFinished(true);
        });
    }, [])

    if (finished) { return (
        viewSedinta ? <Sedinta data={propsToPass} changeView={setViewSedinta} numar={bold} ora={oraBold} /> : <div className={styles.container + " container px-auto py-4"}>
            {error && <div className={styles.error_msg}>{error}</div>}
            <div className={styles.row1}>
                <h1>Calendar</h1>
                <Calendar   
                    cellRender={date => {
                        let foundd = search(new Date(date).toDateString(), sedinte)
                        if (foundd.length > 0) {
                            return <div className='d-flex flex-row flex-wrap'>{foundd.map(sedinta => {
                                return <div className={styles.dot}>`</div>
                            })}</div>
                        }
                    }}
                    onSelect={date => {
                        setDatestring(new Date(date).toDateString())
                        let foundd = search(new Date(date).toDateString(), sedinte)
                        if (foundd.length > 0) {
                            setFound(foundd);
                            return <div className='d-flex flex-row flex-wrap'>{foundd.map(sedinta => {
                                return <div className={styles.dot}>`</div>
                            })}</div>
                        }
                        else setFound([]);
                    }}
                />
            </div>
            <div className={styles.row2}>
                <h3>Evenimente - {datestring}</h3>
                {
                    found.length > 0 ? <Event key={Math.random()} userid={userid} sedinte={found} setViewSedinta={setViewSedinta} setBold={setBold} setPropsToPass={setPropsToPass} setFinished={setFinished} setOraBold={setOraBold}/> : <p>Niciun eveniment la aceasta data!</p>
                }
            </div>
        </div>
)} 
    else return (
        <div className={styles.container + " container px-auto py-4"}>
            <p>Loading...</p>
        </div>
    )
}

export default AutoCalendar