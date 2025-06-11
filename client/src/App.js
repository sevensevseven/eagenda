import {Route, Routes, Navigate} from "react-router-dom";
import Main from "./components/Main";
import "./index.css";
import Success from "./components/Success/Success";
import Canceled from "./components/Canceled/Canceled";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Auth from "./components/Auth/Auth";
import Install from "./components/Install";

function App() {
	const [shouldDisplay, setShouldDisplay] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		axios.post("/api/validateToken", {}, { withCredentials: true })
			.then(response => {
				setShouldDisplay(response.data.valid);
				setLoaded(true);
			})
			.catch(() => {
				setShouldDisplay(false);
				setLoaded(true);
			});
	}, []);

	if (!loaded) return <></>
	else {
		if (shouldDisplay) return (
			<Routes>
				<Route path="/" exact element={<Main />} />
				<Route path="/auth" exact element={<Navigate replace to="/" />} />
				<Route path="/canceled" exact element={<Canceled />} />
				<Route path="/success" exact element={<Success />} />
				<Route path="/install" exact element={<Install />} />
			</Routes>
		);
		else return (
			<Routes>
				<Route path="/auth" exact element={<Auth />} />
				<Route path="/install" exact element={<Install />} />
              	<Route path="*"       element={<Navigate replace to="/auth" />} />
			</Routes>
		)
	}
}

export default App;
