import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { BarLoader } from "react-spinners";

const Login = ({ change }) => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			// const url = "http://localhost:8080/api/auth";
			const url = "/api/auth"
			await axios.post(url, data, { withCredentials: true });
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setLoading(false);
				return;
			}
		}
		setLoading(false);
	};

	return (
		<div className={styles.login_form_container}>
			<div className={styles.left}>
				<form className={styles.form_container} onSubmit={handleSubmit}>
					<h1 style={{ marginTop: 30, textAlign: "center" }}>Conectează-te la contul tău</h1>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={data.email}
						required
						className={styles.input}
					/>
					<input
						type="password"
						placeholder="Parola"
						name="password"
						onChange={handleChange}
						value={data.password}
						required
						className={styles.input}
					/>
					{error && <div className={styles.error_msg}>{error}</div>}
					<button type="submit" className={styles.green_btn} disabled={loading}>
						{loading ? (
							<BarLoader color={"#ffffff"} loading={loading} size={30} />
						) : (
							"Conectează-te"
						)}
					</button>
				</form>
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "10px" }} className={styles.change}>
					<p style={{ marginBottom: 0 }}>Membru nou?</p>
					<button type="button" className={styles.white_btn} onClick={() => change(false)}>
						Înregistrează-te acum!
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;