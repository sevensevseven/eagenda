import React from 'react';
import styles from "./styles.module.css";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import VerifyEmail from './VerifyEmail/VerifyEmail';

const Auth = () => {
    const [login, setLogin] = useState(true);
    const [verifyPage, setVerifyPage] = useState(false);
    const [verificationInfo, setVerificationInfo] = useState([]);
    return (
        
        <div className={styles.noScroll}>
            <div className={styles.background}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={styles.container}>
                {verifyPage ? (
                    <VerifyEmail verificationInfo={verificationInfo} />
                ) : (
                    login ? <Login change={setLogin}/> : <Signup change={setLogin} triggerVerifyPage={setVerifyPage} setVerificationInfo={setVerificationInfo}/>
                )}
            </div>
        </div>
    )
};

export default Auth;