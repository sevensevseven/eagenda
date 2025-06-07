import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Canceled = () => {
    return (
        <div className={styles.container}>
            <h1>Tranzactie Anulata</h1>
            <p>Se pare ca ati anulat plata sau ati iesit din procesul de checkout. Puteti reveni oricand pentru a incerca din nou.</p>
            <Link to="/">
                <button className='btn btn-secondary mt-1'>Inapoi la pagina principala</button>
            </Link>
        </div>
    )
}

export default Canceled;