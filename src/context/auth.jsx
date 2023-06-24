import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../services/api";

export const AuthContext = createContext();

/*  eslint-disable react/jsx-no-constructed-context-values */
/*  eslint-disable prefer-destructuring */
/*  eslint-disable react/prop-types */
export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');

        if (recoveredUser) {
            setUser(recoveredUser);
        }
        setLoading(false);
    }, []);
    
    const login = async (username, password) => {

        // conexão com a api para confirmação de token
        const response = await createSession(username, password);

        const loggedUser = response.data.username;
        const token = response.data.token;

        localStorage.setItem("token", token);
        localStorage.setItem("user", loggedUser);

        // setando header padrão nas requisições, enviando o token em todas as requisições
        api.defaults.headers.Authorization = `Bearer ${token}`;
        
        setUser(loggedUser)
        navigate("/formulario");

    };
    const logout = () => {
        console.log("logout");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;
        
        setUser(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};