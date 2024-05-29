// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const useAuth = (idUser, token) => {
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!idUser || !token) {    navigate('/login');   }
        }, [idUser, token, navigate]);
};

export default useAuth;
