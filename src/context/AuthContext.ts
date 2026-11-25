import { type User } from "firebase/auth";
import { createContext } from "react";

type AuthUser = {
    user: User | null;
    loading: boolean;
};

export const AuthContext = createContext<AuthUser>({ user: null, loading: true });
