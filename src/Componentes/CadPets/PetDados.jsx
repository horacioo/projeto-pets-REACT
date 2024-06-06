import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../jsEmGeral/useAuth';
import { BuscarNoServidor, buscaDoServidor, saveUserData } from '../../jsEmGeral/fetchUserData';
import SelectPets from './SelectPets';

function PetDados() {

   /********************************************************************************/
   const [idUser, setIdUser] = useState(window.sessionStorage.getItem("UserId"));
   const [token, setToken] = useState(window.sessionStorage.getItem("token"));
   const [dados, setDados] = useState([]);
   useAuth(idUser, token);
   /********************************************************************************/
   const[ animal, setAnimal] = useState(); 
   const[nome,setNome] = useState();
   const[descricao,setDescricao] = useState();
   const [foto, setFoto] = useState(null);
   /********************************************************************************/
   
   /********************************************************************************/
   const params = useParams(); // Obtendo os parâmetros da URL
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
            
            if (response.dados && response.dados[0]) {
                  setDados(response.dados[0]);
                  const petData = response.dados[0];
                  setAnimal(petData.tipo);
                  setNome(petData.nome);
            }
            /****************************************************************/

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
         <h2>Dados do Pet</h2>
         <p>Tutor: {tutorRecebido}</p>
   


         {
            
            parseInt(idUser) === parseInt(dados.usuario)
               ?
               (
                  <>
                     <p><label>Nome: <input type='text' value={nome} onChange={(e)=>setNome(e.target.value)} />  </label></p>
                     <p>Meu Pet é um:<SelectPets value={animal} onChange={(e) => setAnimal(e.target.value)} /> </p>
                     <p>
                        <label>
                           descrição: <textarea name="descricao" onChange={(e)=>setDescricao(e.target.value)}>{dados.descricao}</textarea>
                        </label>
                     </p>
                     <p>
                        <label>Foto do Pet:
                           <input className='form-control' type="file" id="fotoPet" name="foto" onChange={(e)=>setFoto(e.target.value)} />
                        </label>
                     </p>
                     <p><figure>
                        <img src={`http://localhost/pets_esperto/petsEsperto/storage/app/public/${dados.foto}`} />
                     </figure></p>
                  
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
