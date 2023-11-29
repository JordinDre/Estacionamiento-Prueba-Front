import axioss from "../utils/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('AUTH_TOKEN');
    const role = localStorage.getItem('ROLE');
    const userId = localStorage.getItem('ID');
    const [cargando, setCargando] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (token && userId) {
                try {
                    const response = await axioss('/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                } catch (error) {
                    setError(error);
                }
            }
        };

        fetchUser();
    }, [token, userId]);

    const login = async (datos, setErrores) => {
        setCargando(true);
        try {
            const { data } = await axioss.post('/login', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            localStorage.setItem('ROLE', data.role);
            localStorage.setItem('ID', data.user.id);
            localStorage.setItem('NAME', data.user.name);
            localStorage.setItem('EMAIL', data.user.email);
            localStorage.setItem('PERMISOS', JSON.stringify(data.permissions));
            setUser(data.user);
            navigate('/');
            window.location.reload();
        } catch (error) {
            setErrores(error.response.data.errors);
        }
        setCargando(false);
    };

    const registro = async (datos, setErrores) => {
        try {
            const { data } = await axioss.post('/registro', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setUser(data.user);
        } catch (error) {
            setErrores(error.response.data.errors);
        }
    };

    const logout = async (setErrores) => {
        setCargando(true);
        try {
            localStorage.removeItem('AUTH_TOKEN');
            localStorage.removeItem('ROLE');
            localStorage.removeItem('ID');
            localStorage.removeItem('NAME');
            localStorage.removeItem('EMAIL');
            localStorage.removeItem('PERMISOS');
            window.location.reload();
            await axioss.post('/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(null);
        } catch (error) {
            setErrores(error.response.data.errors);
        }
        setCargando(false);
    };

    return {
        login,
        registro,
        logout,
        user,
        error,
        cargando,
        token,
        role,
        userId
    };
};

export default useAuth;
