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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.post("https://accomplished-nourishment-production.up.railway.app/api/validateToken", { token })
        .then(response => {
          // Expecting the backend to return an object with a 'valid' boolean property
          setShouldDisplay(response.data.valid);
        })
        .catch(() => {
          setShouldDisplay(false);
        });
    } else {
      setShouldDisplay(false);
    }
  }, []);

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
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
      <Route path="/success" exact element={<Navigate replace to="/login" />} />
    </Routes>
  )
}

export default App;
