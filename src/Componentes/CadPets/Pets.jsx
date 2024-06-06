import React, { useEffect, useState } from 'react';
import useAuth from '../../jsEmGeral/useAuth';
import { buscaDoServidor } from '../../jsEmGeral/fetchUserData';
import DisplayPets from './displayPets/DisplayPets';
import SelectPets from './SelectPets';


function Pets() {
    /******************************************************************************/
    const [idUser, setIdUser] = useState(window.sessionStorage.getItem("UserId"));
    const [token, setToken] = useState(window.sessionStorage.getItem("token"));
    useAuth(idUser, token);
    /******************************************************************************/


    /*******************************Trazendo dados Do Servidor*********************/
    const url = '/pets/react/listaPets';
    const [MeusPets, setMeusPets] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await buscaDoServidor(token, idUser, 'http://localhost/pets_esperto/petsEsperto/public/api' + url);

                if (data.length === 0) {
                    setMeusPets([]);
                } else {
                    setMeusPets(data);
                }

            } catch (error) {
                console.error('Erro ao buscar dados do servidor:', error);
            }
        };

        fetchData();
    }, [token, idUser]);
    /******************************************************************************/
    const [nome, setNome] = useState('');
    const [animal, setAnimal] = useState('');
    const [foto, setFoto] = useState(null);

    const handleNomeChange = (e) => setNome(e.target.value);
    const handleAnimalChange = (e) => setAnimal(e.target.value);
    const handleFotoChange = (e) => setFoto(e.target.files);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lógica para enviar os dados do formulário para o servidor
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('tipo', animal);
        formData.append('user_id', idUser);
        formData.append('foto', foto[0]);

        try {
            const response = await fetch('http://localhost/pets_esperto/petsEsperto/public/api/meusPets/save', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            if (!response.ok) throw new Error('Erro ao enviar dados');
            const data = await response.json();
            console.log('Dados enviados com sucesso:', data);
            setMeusPets(data);

        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p />
                <label>Nome:
                    <input type='text' name='nome' value={nome} onChange={handleNomeChange} />
                </label>
                <p />

           
                <p /> 
                
                    Meu Pet é um :
                    <SelectPets value={animal} onChange={(e) => setAnimal(e.target.value)} />  
                <p />
                <label>Foto do Pet:
                    <input className='form-control' type="file" id="fotoPet" name="foto" onChange={handleFotoChange} />
                </label>
                <button type="submit">Salvar</button>
            </form>

            lista de imagems e dados dos meus pets
            {/***********************************/}
            <div>
                <DisplayPets dados={MeusPets}  />
            </div>

        </>
    );
}

export default Pets;
