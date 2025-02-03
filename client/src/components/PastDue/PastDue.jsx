import React from 'react'
import PropTypes from 'prop-types'
import styles from "./styles.module.css";
import axios from 'axios';

const PastDue = ({ userInfo }) => {
    async function openSubscriptionPortal() {
        try {
            // const url = "http://localhost:8080/api/changeemailmodificari";
            const url = "https://accomplished-nourishment-production.up.railway.app/api/create-portal-session"

            const res = await axios.post(url, {
                customer_id: userInfo.customer_id.slice(9)
            }, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })

            window.location = res.data;
        } catch (error) {
            if (error.response && 
                error.response.status >= 400 && 
                error.response.status <= 500
            ) {
                console.log(error.response.data.message)
            }
        }
    }

    return (
        <div className={styles.container + " container px-auto py-4"}>
            <h1>Actiune necesara - Abonament</h1>
            <p>Am intampinat o problema cu metoda dvs. de plata atasata abonamentului. Puteti accesa mai jos portalul unde puteti introduce o alta metoda de plata. In cazul in care nu se va efectua plata in urmatoarele 3 saptamani, abonamentul va fi anulat.</p>
            <button className='btn btn-success mt-3 max-w-sm' onClick={openSubscriptionPortal}>Modificare Date Abonament</button>
        </div>
    )
}

PastDue.propTypes = {
    userInfo: PropTypes.object.isRequired
}

export default PastDue