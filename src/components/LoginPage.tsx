import { useState } from "react";
import styles from "./LoginPage.module.css";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    return (
        <div className={styles.container}>
            <div className={styles.loginimage}></div>
            <div className={styles.loginform}>
                <form onSubmit={async (e) => {
                    e.preventDefault();

                    try {
                        await signInWithEmailAndPassword(auth, email, password);
                    } catch (error) {
                        if (error instanceof FirebaseError) {
                            switch (error.code) {
                                case 'auth/user-not-found':
                                    setError("Invalid credentials");
                                    break;
                                case 'auth/invalid-credential':
                                    setError("Invalid credentials");
                                    break;
                                case 'auth/too-many-requests':
                                    setError("Too many requests. Please try again later.");
                                    break;
                                case 'auth/network-request-failed':
                                    setError("Network error. Please check your connection.");
                                    break;
                                default:
                                    setError("An unexpected error occurred. Please try again.");
                                    break;
                            }

                        }
                        setError("Invalid email or password");
                    }

                }} className={styles.form}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}