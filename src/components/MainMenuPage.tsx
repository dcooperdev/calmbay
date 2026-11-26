import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import styles from "./MainMenuPage.module.css";

export const MainMenuPage = () => {
    const navigate = useNavigate();
    return (
        <div className={styles['main-menu']}>
            <h1>Main Menu</h1>
            <nav>
                <ul className={styles['menu-list']}>
                    <li className={styles['menu-item']}><button onClick={() => navigate('/play')}>Play</button></li>
                    <li className={styles['menu-item']}><button onClick={() => navigate('/profile')}>Profile</button></li>
                    <li className={styles['menu-item']}><button onClick={() => navigate('/settings')}>Settings</button></li>
                    <li className={styles['menu-item']}><button onClick={() => signOut(auth)}>Logout</button></li>
                </ul>
            </nav>
        </div>
    );
};

export default MainMenuPage;