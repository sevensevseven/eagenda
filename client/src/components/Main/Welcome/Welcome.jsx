import React, { useMemo, useState } from 'react'
import styles from "./styles.module.css"
import { useMediaQuery } from 'react-responsive'
import axios from 'axios'
import Pricing from '../../Pricing/Pricing'

const Welcome = ({ userInfo, f }) => {
    const isSmall = useMediaQuery({ query: `(max-width: 700px)`})
    const isMobile = useMediaQuery({ query: `(max-width: 450px)`})
    const [notif, setNotif] = useState(userInfo.emailmodificari)
    const [notif2, setNotif2] = useState(userInfo.emailsedinte)
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(true);

    async function handleChangeemailmodificari() {
        setSaved(false);
        try {
            // const url = "http://localhost:8080/api/changeemailmodificari";
            const url = "https://accomplished-nourishment-production.up.railway.app/api/changeemailmodificari"

            await axios.post(url, {
                emailmodificari: notif,
                emailsedinte: notif2,
                userid: userInfo.id
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
        } catch (error) {
            if (error.response && 
                error.response.status >= 400 && 
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
                console.log(error.response.data.message)
            }
        }
        setSaved(true);
    }

    async function openSubscriptionPortal() {
        try {
            // const url = "http://localhost:8080/api/changeemailmodificari";
            const url = "https://accomplished-nourishment-production.up.railway.app/api/create-portal-session"

            const res = await axios.post(url, {
                customer_id: userInfo.customer_id
            }, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })

            // console.log(res.data)

            window.location = res.data;
        } catch (error) {
            if (error.response && 
                error.response.status >= 400 && 
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
                console.log(error.response.data.message)
            }
        }
    }
        
    return (
        <div className={styles.container + " container px-auto py-4"}>
            {error && <div className={styles.error_msg}>{error}</div>}
            <h1>
                Bun venit, <strong>{userInfo.first + " " + userInfo.last}</strong>
            </h1>
            <h4>Pentru a incepe, apasati unul din butoanele de mai jos...</h4>
            <div className={!isSmall ? "w-25 d-flex flex-column my-2" : !isMobile ? "w-50 d-flex flex-column my-2" : "w-100 d-flex flex-column my-2"}>
                <button className='btn btn-primary my-2' onClick={e => f(1)}>Calendar</button>
                <button className='btn btn-primary my-2' onClick={e => f(2)}>Adaugare Dosare</button>
                <button className='btn btn-primary my-2' onClick={e => f(3)}>Lista Dosare</button>
            </div>
            <h4 className='mt-3'>Sau evaluati-va <strong>setarile</strong> aici</h4>
            <div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" checked={notif} onChange={() => {setNotif(!notif)}} id="emailmodificari"/>
                    <label className="form-check-label" htmlFor="emailmodificari">
                        Notificari email despre modificarea dosarelor din lista dvs.
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" checked={notif2} onChange={() => {setNotif2(!notif2)}} id="emailsedinte"/>
                    <label className="form-check-label" htmlFor="emailsedinte">
                        Notificari email despre sedinte ce urmeaza in scurt timp.
                    </label>
                </div>
                <button className='btn btn-primary mt-3' onClick={handleChangeemailmodificari}>{saved ? "Save" : "Saving..."}</button>
            </div>
            <h4 className='mt-3'>Sau schimbati <strong>datele abonamentului dvs.</strong> aici</h4>
            <div>
                <button className='btn btn-success my-3' onClick={openSubscriptionPortal}>Modificare Date Abonament</button>
            </div>
        </div>
    )
}

export default Welcome