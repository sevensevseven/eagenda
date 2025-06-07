import React, { useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { useState } from 'react';
import { BarLoader } from 'react-spinners';

const VerifyEmail = ({ verificationInfo }) => {
    const inputsRef = useRef([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const sendVerificationCode = useCallback(async () => {
        try {
            await axios.post('/api/verifyEmail', {
                email: verificationInfo[1],
            });
        } catch (error) {
            console.error('Failed to send verification code', error);
            setError(
                error.response?.data?.message || "A apărut o eroare la trimiterea codului. Încearcă din nou."
            );
        }
    }, [verificationInfo]);
    
    useEffect(() => {
        sendVerificationCode();
    }, [sendVerificationCode]);

    async function handleSuccess() {
        const { data } = await axios.post("/api/fetchUIDFromTempCookie");

        axios.post("/api/create-subscription-checkout-session", {
            plan: verificationInfo[0],
            customerId: data.id
        })
        // .then((res) => {
        //     if (res.ok) return res.json();
        //     console.log(res);
        //     return res.json().then((json) => Promise.reject(json));
        // })
        .then((res) => {
            window.location = res.data.session.url;
        })
        .catch((e) => {
            console.log(e);
        });
    }
 
    function compareCodes() {
        setError(null);
        setLoading(true);
        const code = inputsRef.current.map(input => input.value).join('');
        if (code.length < 6) {
            setError("Te rugăm să introduci toate cifrele.");
            setLoading(false);
            return;
        }

        axios.post('/api/compareCodes', {
            code: parseInt(code, 10),
            email: verificationInfo[1],
        })
        .then(response => {
            if (response.data.success) {
                // Handle successful verification
                console.log('Code verified successfully');
                handleSuccess();
            } else {
                setError(response.data.message);
            }
            setLoading(false);
        })
        .catch(error => {
            console.error('Error verifying code:', error);
            setError(
                error.response?.data?.message || 'A apărut o eroare. Te rugăm să încerci din nou.'
            );
            setLoading(false);
        });
    }

    function back() {
        axios.post('/api/deleteAccount').then(() => {
            window.location.href = "/auth";
        }).catch((err) => {
            console.error(err);
        });
    }

    //TODO: cleanup when the user clicks the back button in a checkout session, and find a solution for the 30 minute time frame while the session still exists

    return (
        <div className="h-full w-full mx-3 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white flex flex-col justify-center items-start px-7 py-4 rounded-lg">
            <div className='-ml-2 -mt-2 cursor-pointer text-blue-600 underline' onClick={() => back()}>
                {"< Înapoi"}
            </div>
            <div className="flex items-center justify-center flex-col self-center">
                <h1 className='mt-0 font-semibold'>Verificare email</h1>
                <p className='mb-0 mt-1 max-w-md text-center'>Te rugăm să introduci mai jos codul primit pe adresa <span className=' font-extrabold'>{verificationInfo[1]}</span>.</p>
                <div className="flex gap-1 my-3">
                    {[...Array(6)].map((_, i) => (
                        <input
                            key={i}
                            type="text"
                            maxLength="1"
                            className="w-10 h-10 text-2xl text-center border border-gray-300 focus:outline-gray-900 rounded"
                            ref={(el) => inputsRef.current[i] = el}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (!/^\d$/.test(value)) {
                                    e.target.value = "";
                                    return;
                                }
                                if (i < 5 && value) {
                                    inputsRef.current[i + 1]?.focus();
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && !e.target.value && i > 0) {
                                    inputsRef.current[i - 1]?.focus();
                                }
                            }}
                            onPaste={(e) => {
                                const paste = e.clipboardData.getData('text').trim();
                                if (!/^\d{6}$/.test(paste)) return;
                                paste.split('').forEach((digit, index) => {
                                    if (inputsRef.current[index]) {
                                        inputsRef.current[index].value = digit;
                                    }
                                });
                                // Prevent default paste behavior
                                e.preventDefault();
                            }}
                        />
                    ))}
                </div>
                {error && <div className={styles.error_msg}>{error}</div>}
                <button className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-600 transition min-h-11 min-w-12" onClick={compareCodes} disabled={loading}>
                    {loading ? (
                        <BarLoader color={"#ffffff"} loading={loading} width={100} />
                    ) : (
                        "Către Plată"
                    )}
                </button>
                <p className="text-sm mt-3 mb-1">
                    Nu ai primit codul? <button onClick={sendVerificationCode} className="text-blue-600 underline">Trimite din nou</button>
                </p>
            </div>
        </div>
    );
};

export default VerifyEmail;