import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../jsEmGeral/useAuth';
import { BuscarNoServidor, buscaDoServidor, saveUserData } from '../../jsEmGeral/fetchUserData';

function PetDados() {

   /********************************************************************************/
   const [idUser, setIdUser] = useState(window.sessionStorage.getItem("UserId"));
   const [token, setToken] = useState(window.sessionStorage.getItem("token"));
   const [dados, setDados] = useState([]);
   useAuth(idUser, token);
   /********************************************************************************/

   const params = useParams(); // Obtendo os parâmetros da URL

   // Acesso aos parâmetros individuais
   const tutorRecebido = params.tutor;
   const nomePetRecebido = params.nomePet;
   /**************************************/


   /*****************************************/
   /*****************************************/

   const url = '/pets/react/DadosDoPet';
   console.log("começo da requisição");
   useEffect(() => {
      const fetchData = async () => {
         try {
            const data = {
               token: window.sessionStorage.getItem("token"),
               user_id: idUser,
               pet: nomePetRecebido,
               tutor: tutorRecebido
            };
            const response = await BuscarNoServidor(data, 'GET', 'http://localhost/pets_esperto/petsEsperto/public/api/pets/react/DadosDoPet');

            setDados(response.dados[0]);
            console.log(response.dados[0]);//if (data.length === 0){}else{}

         } catch (error) {
            console.error('Erro ao buscar dados do servidor:', error);
         }
      };
      fetchData();
   }, [token, idUser]);

   /*****************************************/
   /*****************************************/

   return (
      <>
         <h1>Dados do Pet</h1>
         <p>Tutor: {tutorRecebido}</p>
         <p>Nome do Pet: {nomePetRecebido}</p>
     

         {
            parseInt(idUser) === parseInt(dados.usuario)
               ?
               (
                  <>
                     <p><label>Nome: <input type='text' value={dados.nome} /></label></p>
                     <p><label>
                        Meu Pet é um  :
                        <select name='animal' value={dados.tipo} >
                           <option value={1}>Cachorro</option>
                           <option value={2}>Gatos</option>
                           <option value={5}>Peixe</option>
                           <option value={6}>Passaro</option>
                           <option value={7}>Reptil</option>
                           <option value={4}>Outros</option>
                        </select>
                     </label>
                     </p>
                     <p>
                        <label>
                          descrição: <textarea name="descricao"></textarea>
                        </label>
                     </p>
                     <p>
                     <label>Foto do Pet:
                        <input className='form-control' type="file" id="fotoPet" name="foto" />
                     </label>
                     </p>
                  </>
               )
               :
               (
               <>
                 <p>Nome: {dados.nome}</p>
                 <p>tipo: {dados.tipo}</p>
                 <p>descrição: {dados.descricao}</p>
                 <p><figure>
                        <img src={`http://localhost/pets_esperto/petsEsperto/storage/app/public/${dados.foto}`} />
                    </figure></p>
               </>
               )
         }

      </>
   );
}

export default PetDados;
