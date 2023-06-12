import React, { useContext, createContext, useState, useEffect } from "react";

import { auth } from "../config/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
    }, [user]);

    return (
        <AuthContext.Provider value={{ user }}>
            { !loading && children }
        </AuthContext.Provider>
    );
};