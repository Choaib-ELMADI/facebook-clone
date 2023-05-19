import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../config/firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);

            if (user) navigate('/home');
            else navigate('/');
        });
    }, [user, navigate]);

    return (
        <AuthContext.Provider value={{ user }}>
            { !loading && children }
        </AuthContext.Provider>
    );
};