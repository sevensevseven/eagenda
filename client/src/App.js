import {Route, Routes, Navigate} from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./index.css";
import Success from "./components/Success/Success";
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
	const [shouldDisplay, setShouldDisplay] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			axios.post("https://accomplished-nourishment-production.up.railway.app/api/validateToken", {}, { withCredentials: true })
				.then(response => {
					setShouldDisplay(response.data.valid);
					setLoaded(true);
				})
				.catch(() => {
					setShouldDisplay(false);
					setLoaded(true);
				});
		} else {
			setShouldDisplay(false);
			setLoaded(true);
		}
	}, []);

	if (!loaded) return <></>
	else {
		if (shouldDisplay) return (
			<Routes>
				<Route path="/" exact element={<Main />} />
				<Route path="/signup" exact element={<Navigate replace to="/" />} />
				<Route path="/login" exact element={<Navigate replace to="/" />} />
				<Route path="/success" exact element={<Success />} />
			</Routes>
		);
		else return (
			<Routes>
				<Route path="/signup" exact element={<Signup />} />
               	<Route path="/login"  exact element={<Login />} />
              	<Route path="*"       element={<Navigate replace to="/login" />} />
			</Routes>
		)
	}
}

export default App;
