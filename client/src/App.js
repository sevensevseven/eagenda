import {Route, Routes, Navigate} from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./index.css";
import Success from "./components/Success/Success";

const isTokenExpired = token => Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000

function App() {
  const user = localStorage.getItem("token");

	const shouldDisplay = user ? !isTokenExpired(user) : false

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
