import React, { useState } from 'react';
import useAuth from '../jsEmGeral/useAuth';

function Dashboard() {

    const [idUser, setIdUser] = useState(window.sessionStorage.getItem("UserId"));
    const [token, setToken] = useState(window.sessionStorage.getItem("token"));
    
    useAuth(idUser, token);

    return (<><h1>Novidades no Mundo PET</h1></>)

}

export default Dashboard;