import React, { useState } from 'react';
import './css/display.css'
import PetName from './PetName';
import { Link, useParams } from 'react-router-dom';




function DisplayPets({ dados }) {


    const [token, setToken] = useState(window.sessionStorage.getItem("token"));



    return (
        <ul className="meusPets">

            {dados.map((pet, index) => (

                <li key={index}>
                    <ul>
                        <li><Link to={`/Cadastro/Pets/Editar/${pet.id}`}>Editar</Link></li>
                        <li><Link to={`/${pet.tutorNome}/pet/${pet.nome}`}> Link Da Minha Página {pet.id} - {pet.tutorNome} </Link></li>
                    </ul>
                    <figure>
                        <img src={`http://localhost/pets_esperto/petsEsperto/storage/app/public/${pet.foto}`} />
                    </figure>
                    <PetName nome={pet.nome} tipo={pet.tipo} />
                </li >

            ))
            }



        </ul >
    );
}



export default DisplayPets;
