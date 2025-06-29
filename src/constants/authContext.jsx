// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const login = (userData) => {        
        localStorage.setItem("user", JSON.stringify(userData));        
        setUser(userData);
    };

    const logout = () => {        
        localStorage.removeItem("user");          
        setUser(null);
    }

    useEffect(() => {      
        const storedUser = localStorage.getItem("user");
        if (storedUser) {           

            setUser(storedUser);
        }
    }, []);
    // setUser(JSON.parse(storedUser));


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);