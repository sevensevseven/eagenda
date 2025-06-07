import styles from "./styles.module.css";
import axios from 'axios';
import { useMemo, useState, useRef, useEffect } from "react";
import AutoCalendar from "./Calendar/Calendar";
import Add from "./Add/Add";
import List from "./List/List";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Welcome from "./Welcome/Welcome"
import Pricing from "../Pricing/Pricing";
import PastDue from "../PastDue/PastDue";

const Main = () => {
	const [userInfo, setUserInfo] = useState({});
	const [page, setPage] = useState(0);
	// const isMobile = useMediaQuery({ query: `(max-width: 450px)`})
	const [subbed, setSubbed] = useState(false);
	const [pastDue, setPastDue] = useState(false);
	const isOpenRef = useRef(false); 
	// const [isVisible, setIsVisible] = useState(true);
	// const isScrollingVisible = useRef(true);
	const navbarRef = useRef(null);

	const handleLogout = () => {
		axios
			.post('/api/logout', {}, { withCredentials: true })
			.then(() => {
				// Optionally clear any client-side state here
				window.location = "/login";
			})
			.catch(err => {
				console.error('Logout failed', err);
			});
	};

	const fetchInfo = (callback) => {
		try {
			axios.post(
				// 'http://localhost:8080/api/fetch',
				"/api/fetch",
				{},
				{ withCredentials: true }
			).then(response => {
				callback(null, response.data[0]);
			});
		} catch (error) {
			callback(error, null);
			console.log(error)
		}
	};

	const toggleMenu = () => {
        isOpenRef.current = !isOpenRef.current;
        if (navbarRef.current) {
            navbarRef.current.style.display = isOpenRef.current ? "block" : "none";
        }
    };

    useEffect(() => {
        // const listenToScroll = () => {
        //     const heightToHideFrom = 1;
        //     const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

        //     const newVisibility = winScroll <= heightToHideFrom;
        //     if (isScrollingVisible.current !== newVisibility) {
        //         isScrollingVisible.current = newVisibility;
        //         if (navbarRef.current) {
        //             navbarRef.current.style.display = newVisibility && isOpenRef.current ? "block" : "none";
        //         }
        //     }
        // };

        const handleResize = () => {
            if (window.innerWidth > 768 && isOpenRef.current) {
                isOpenRef.current = false;
                if (navbarRef.current) {
                    navbarRef.current.style.display = "none";
                }
            }
        };

        // window.addEventListener("scroll", listenToScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            // window.removeEventListener("scroll", listenToScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

	useMemo(() => {
		// const query = new URLSearchParams(window.location.search);

		fetchInfo((err, data) => {
			if (err) {
				console.error("Login error: ", err);
			} else {
				// if (query.get('success')) {
				// 	axios.post("/api/payment-success", {
				// 		sessionId: query.get("session_id"),
				// 		uid: data.id
				// 	})
				// 	.then(res => {
				// 		if (res.data.data != "" && typeof res.data.type == "undefined") {
				// 			setSubbed(true); 
				// 			setUserInfo({...data, customer_id: res.data.data})
				// 		} else {
				// 			setUserInfo(data)
				// 			setInvalid(typeof res.data.type == "undefined" ? res.data.message : res.data.type);
				// 		}
				// 		console.log(res.data.message)
				// 	}) 
				// 	.catch(e => {
				// 		console.log(e)
				// 	}) 
				// }
				// else {
				setUserInfo(data);
				if (data.customer_id != null) {
					if (data.customer_id.startsWith("cus")) setSubbed(true);
					else if (data.customer_id.startsWith("past_due_cus")) setPastDue(true);
				}  
				// }
				console.log("Logged in with user id ", data.id);
			}
		});
	}, []);

	if (userInfo.id) return (
		<div className={styles.main_container}>
			{/* <nav className={styles.navbar}>
				<div className={styles.navbar_contents}>
					<h1 role="button" onClick={e => setPage(0)}>App</h1>
					{subbed ? 
						<div className={styles.navbar_buttons}>
							<div onClick={e => setPage(1)}>Calendar</div>
							<div onClick={e => setPage(2)}>Adauga Dosare</div>
							<div onClick={e => setPage(3)}>Lista Dosare</div>
						</div> 
						
					: <></>}
				</div>
				<button className={styles.white_btn} onClick={handleLogout}>
					{!isMobile ? "Deconectare" : <strong><i className="bi bi-box-arrow-right"/></strong>}
				</button>
			</nav> */}
			<nav className={styles.navbar}>
				<div className="container mx-auto flex justify-between items-center">
					{/* Brand/Logo */}
					<div className="text-white font-bold text-xl cursor-pointer" onClick={e => setPage(0)}>
						CuriaChronos
					</div>

					{/* Hamburger Icon */}
					<div className="md:hidden">
						<button
							onClick={toggleMenu}
							className="text-white focus:outline-none"
						>
							<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								></path>
							</svg>
						</button>
					</div>

					{/* Desktop Nav Links */}
					<div className="hidden md:flex md:space-x-6 items-center">
						{subbed ? <><div className="block py-2 text-white hover:text-gray-300 cursor-pointer" onClick={e => setPage(1)}>Calendar</div>
						<div className="block py-2 text-white hover:text-gray-300 cursor-pointer" onClick={e => setPage(2)}>Adauga Dosare</div>
						<div className="block py-2 text-white hover:text-gray-300 cursor-pointer" onClick={e => setPage(3)}>Lista Dosare</div></> : <></>}
					</div>

					{/* Button */}
					<div className="hidden md:block">
						<button className="bg-white px-4 py-2 rounded" onClick={handleLogout} style={{color: "#1A2130"}}>
							Log Out
						</button>
					</div>
				</div>
			</nav>
			{/* Mobile Menu */}
			<div ref={navbarRef} className={`md:hidden fixed w-screen`} style={{display: "none", backgroundColor: "#0F0F0F", zIndex: 999999999}}>
				{subbed ? <><div className="block py-2 px-4 text-white hover:text-gray-300 cursor-pointer" onClick={e => setPage(1)}>Calendar</div>
				<div className="block py-2 px-4 text-white hover:text-gray-300 cursor-pointer" onClick={e => setPage(2)}>Adauga Dosare</div>
				<div className="block py-2 px-4 text-white hover:text-gray-300 cursor-pointer" onClick={e => setPage(3)}>Lista Dosare</div></> : <></>}
				<button className="block mt-1 mb-3 ml-5 bg-white text-slate-600 px-4 py-2 rounded hover:bg-gray-200" onClick={handleLogout}>
					Log Out
				</button>
			</div>
			<div>
				{page === 0 && subbed ? <Welcome userInfo={userInfo} f={setPage} emailmodificari={userInfo.emailmodificari}/> : page === 1 && subbed ? <AutoCalendar userid={userInfo.id} /> : page === 2 && subbed ? <Add uid={userInfo.id} /> : page === 3 && subbed ? <List userid={userInfo.id} f={setPage} /> : pastDue ? <PastDue userInfo={userInfo}/> : <Pricing uid={userInfo.id} />}
			</div>
		</div>
	);
	else return (
		<div className={styles.container}>
            <p>Loading...</p>
        </div>
	)
};

export default Main;