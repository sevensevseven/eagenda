import React from "react"
import styles from "./styles.module.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

const Signup = () => {
    const [data, setData] = useState ({
        first: "",
        last: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState();

    const navigate = useNavigate();

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const url = "http://localhost:8080/api/users";
            const url = "https://accomplished-nourishment-production.up.railway.app/api/users"
            const {data: res} = await axios.post(url, data);
            navigate("/login");
            console.log(res.message);
        } catch (error) {
            if (error.response && 
                error.response.status >= 400 && 
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Deja membru?</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn} style={{color: "#1A2130"}}>
                            Conectează-te
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Creează-ți un cont</h1>
                        <input
                            type = "text"
                            placeholder = "Prenume"
                            name = "first"
                            value={data.first}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />

                        <input
                            type = "text"
                            placeholder = "Nume de familie"
                            name = "last"
                            value={data.last}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />

                        <input
                            type = "email"
                            placeholder = "Email"
                            name = "email"
                            value={data.email}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />

                        <input
                            type = "password"
                            placeholder = "Parola nouă"
                            name = "password"
                            value={data.password}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Înregistrare
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Signup;