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
        <>
            <div className={styles.background}>
                <div>
                    <div className={styles.content}></div>
                </div>
            </div>
            <div className={styles.container}>
                {verifyPage ? (
                    <VerifyEmail verificationInfo={verificationInfo} />
                ) : (
                    login ? <Login change={setLogin}/> : <Signup change={setLogin} triggerVerifyPage={setVerifyPage} setVerificationInfo={setVerificationInfo}/>
                )}
            </div>
        </>
    )
};

export default Auth;