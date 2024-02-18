import { createContext, useState } from "react"
import { jwtDecode } from "jwt-decode"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("nickname"));
    const [token, setToken] = useState(localStorage.getItem("token"));

    const userData = token ? jwtDecode(token) : null;

    const updateUserImage = (newImage) => {
        const updatedUserData = { ...userData, image: newImage };
        setUser(updatedUserData);
    }

    const data = { user, setUser, token, setToken, userData, updateUserImage };

    return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};