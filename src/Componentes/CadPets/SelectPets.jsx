import React, { useEffect, useState } from 'react';
import { BuscarNoServidor } from '../../jsEmGeral/fetchUserData';
import { useParams } from 'react-router-dom';

function SelectPets({ value, onChange }) {
   
    const [idUser, setIdUser]  = useState(window.sessionStorage.getItem("UserId"));
    const [token, setToken]    = useState(window.sessionStorage.getItem("token"));
    const [dados, setDados]    = useState([]);
    const { tutor, nomePet }   = useParams(); // Desestruturando os parâmetros da rota

    const tutorRecebido = tutor;
    const nomePetRecebido = nomePet;

    const url = '/pets/react/DadosDoPet';
    console.log("começo da requisição do select");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = {
                    token: window.sessionStorage.getItem("token"),
                    user_id: idUser,
                    pet: nomePetRecebido,
                    tutor: tutorRecebido
                };
                const response = await BuscarNoServidor(data, 'GET', 'http://localhost/pets_esperto/petsEsperto/public/api/pets/react/tipos');
                setDados(response);
                console.log("começa aqui");
                console.log(response);
                console.log("termina aqui");

            } catch (error) {
                console.error('Erro ao buscar dados do servidor:', error);
            }
        };
        fetchData();
    }, [token, idUser, nomePetRecebido, tutorRecebido]);

    return (
        <select onChange={onChange} value={value}>
            {dados.map((info, index) => (
                <option key={index} value={info.id}>  {info.tipo}  </option>
            ))}
        </select>
    );
}

export default SelectPets;
