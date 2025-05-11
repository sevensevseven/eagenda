import styles from "./styles.module.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {useEffect} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {useRef} from "react";
import { BarLoader } from "react-spinners";

const Signup = ({ change, triggerVerifyPage, setVerificationInfo}) => {
    const recaptcha = useRef();

    const [color, setColor] = useState("#ffffff");

    const [data, setData] = useState ({
        first: "",
        last: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState();

    const amounts = {
        monthly: 4.99,
        semestrial: 27.99,
        yearly: 49.99
    }

    const prices = {
        monthly: { amount: amounts.monthly, label: null },
        semestrial: {
            amount: amounts.semestrial,
            label: `-${Math.round((1 - (amounts.semestrial / (amounts.monthly * 6))) * 100)}%`
        },
        yearly: {
            amount: amounts.yearly,
            label: `-${Math.round((1 - (amounts.yearly / (amounts.monthly * 12))) * 100)}%`
        },
    };

    const [recurrence, setRecurrence] = useState("yearly");

    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        recaptcha.current.reset();
        if (data.password !== data.confirmPassword) {
            setSubmitting(false);
            return;
        }
        const token = await recaptcha.current.executeAsync();
        
        console.log(token);

        try {
            const url = "/api/captcha";
            const verified = await axios.post(url, { captchaValue: token });
            
            if (!verified.data.success) {
                setError("Verificarea reCAPTCHA a eșuat. Încearcă din nou.");
                recaptcha.current.reset();
                setSubmitting(false);
                return;
            }
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setSubmitting(false);
                return;
            }
        }

        try {
            // const url = "http://localhost:8080/api/users";
            const url = "/api/users"
            const {data: res} = await axios.post(url, data);
            console.log(res.message);
        } catch (error) {
            if (error.response && 
                error.response.status >= 400 && 
                error.response.status <= 500
            ) {
                setSubmitting(false);
                setError(error.response.data.message);
                return;
            }
        }
        setSubmitting(false);
        recaptcha.current.reset();
        setVerificationInfo([prices[recurrence].amount, data.email]);
        triggerVerifyPage(true);
    };

    return (
        <div className={styles.signup_form_container}>
            <div className={styles.right}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1 style={{ marginTop: 30 }}>Creează-ți un cont</h1>
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
                    <input
                        type="password"
                        placeholder="Confirmă parola"
                        name="confirmPassword"
                        value={data.confirmPassword || ""}
                        required
                        className={styles.input}
                        onChange={handleChange}
                    />
                    {data.confirmPassword && data.password !== data.confirmPassword && (
                        <p style={{ color: "red", fontSize: "0.875rem", marginTop: -5, marginBottom: 0 }}>
                            Parolele nu se potrivesc.
                        </p>
                    )}
                    <hr className="w-full my-2 border-gray-300" />
                    
                    <div className="flex flex-col items-start w-full px-1 text-sm text-gray-700 mb-2 mt-2">
                        <p className="mb-1 text-xs">Abonament Recurent</p>
                        <h3 className="mb-1 font-semibold">
                            {recurrence !== "monthly" && (
                                <div className="text-xs text-red-500 line-through -mb-1">
                                    ${(amounts.monthly * (recurrence === "semestrial" ? 3 : 12)).toFixed(2)}
                                </div>
                            )}
                            €{prices[recurrence].amount.toFixed(2)}
                            {prices[recurrence].label && (
                                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded">{prices[recurrence].label}</span>
                            )}
                        </h3>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="recurrence"
                                    value="monthly"
                                    checked={recurrence === "monthly"}
                                    onChange={() => setRecurrence("monthly")}
                                    className="mr-1"
                                />
                                Lunar
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="recurrence"
                                    value="semestrial"
                                    checked={recurrence === "semestrial"}
                                    onChange={() => setRecurrence("semestrial")}
                                    className="mr-1"
                                />
                                Trimestrial
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="recurrence"
                                    value="yearly"
                                    checked={recurrence === "yearly"}
                                    onChange={() => setRecurrence("yearly")}
                                    className="mr-1"
                                />
                                Anual
                            </label>
                        </div>
                    </div>
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <ReCAPTCHA size="invisible" ref={recaptcha} sitekey={process.env.REACT_APP_SITE_KEY} />
                    <button type="submit" className={styles.green_btn} disabled={submitting}>
                        {submitting ? <BarLoader color={color} width={100} height={3} /> : "Pasul următor"}
                    </button>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "10px" }} className={styles.change}>
                        <p style={{ marginBottom: 0 }}>Deja membru?</p>
                        <button type="button" className={styles.white_btn} onClick={() => change(true)}>
                            Conectează-te!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Signup;