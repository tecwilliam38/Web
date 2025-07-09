// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tecnico, setTecnico] = useState(null)

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };
    const cadastroTecnico = (userData) => {
        // localStorage.setItem("tecnico", JSON.stringify(userData));
        // setTecnico(userData);
    }
    const cadastroClient = (userData) => {
        // localStorage.setItem("user", JSON.stringify(userData));
        // setUser(userData);
    }
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, cadastroTecnico, cadastroClient }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);