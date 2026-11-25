import { useState } from "react";
import styles from "./LoginPage.module.css";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <form onSubmit={async (e) => {
                e.preventDefault();

                try {
                    await signInWithEmailAndPassword(auth, email, password);
                } catch (error) {
                    console.error("Error signing in:", error);
                }

            }} className={styles.form}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Login</button>
            </form>
        </>
    );
}