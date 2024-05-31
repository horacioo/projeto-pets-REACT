import React, { useState } from 'react';


function PetName({ nome, tipo }) {

    const [tipoInfo, SetTipoInfo]=useState(tipo)
    //const [tipoInfo, setTipoInfo] = useState(tipo); // Alteração aqui

    let tipoDescricao = '';
    switch (tipoInfo) {
        case 1:
            tipoDescricao = 'Cachorro';
            break;
        case 2:
            tipoDescricao = 'Gato';
            break;
        case 3:
            tipoDescricao = 'Peixe';
            break;
        case 4:
            tipoDescricao = 'Outros';
            break;
        case 5:
            tipoDescricao = 'peixe';
            break;
        case 6:
            tipoDescricao = 'Pássaro';
            break;
        case 7:
            tipoDescricao = 'Reptil';
            break;
        default:
            tipoDescricao = 'Tipo não identificado';
            break;
    }

    return (
        <>
         <h2>Nome: <b>{nome}</b> </h2>
         <h3><b>{nome}</b> é um(a) 
         
         {tipoDescricao} 
         </h3>
        </>
    );
}



export default PetName;
