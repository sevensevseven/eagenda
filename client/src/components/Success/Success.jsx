import React from 'react'
import {Link} from "react-router-dom";
import styles from "./styles.module.css";

const Success = () => {
    return (
        <div className={styles.container}>
            <h1>Success</h1>
            <p>Multumim pentru tranzactia dvs.! Apasati butonul de mai jos pentru a accesa aplicatia.</p>
            <Link to="/">
                <button className='btn btn-success mt-1'>Acceseaza</button>
            </Link>
        </div>
    )
}

export default Success