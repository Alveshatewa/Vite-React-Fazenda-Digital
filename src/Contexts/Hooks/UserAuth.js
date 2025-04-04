import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => setUser(response.data))
                .catch(() => localStorage.removeItem("token"));
        }
    }, []);

    return user;
};

export default useAuth;
