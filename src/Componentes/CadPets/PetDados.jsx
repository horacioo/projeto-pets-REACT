import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../jsEmGeral/useAuth';
import { BuscarNoServidor, buscaDoServidor, saveUserData } from '../../jsEmGeral/fetchUserData';
import SelectPets from './SelectPets';

function PetDados() {
   const navigate = useNavigate();
   /********************************************************************************/
   const [idUser, setIdUser] = useState(window.sessionStorage.getItem("UserId"));
   const [token, setToken] = useState(window.sessionStorage.getItem("token"));
   const [dados, setDados] = useState([]);
   useAuth(idUser, token);
   /********************************************************************************/
   const [animal, setAnimal] = useState();
   const [nome, setNome] = useState();
   const [descricao, setDescricao] = useState();
   const [foto, setFoto] = useState(null);
   const [idPet, setIdPet] = useState(null);
   const handleFotoChange = (e) => setFoto(e.target.files);
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
               setFoto(petData.foto);
               setDescricao(petData.descricao);
               setIdPet(petData.id);
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
   /*****************************************/
   /*****************************************/
   /*****************************************/
   /*****************************************/
   /*****************************************/
   /*****************************************/
   /*****************************************/
   const Update = async (e) => {
      e.preventDefault();
      // Lógica para enviar os dados do formulário para o servidor
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('tipo', animal);
      formData.append('user_id', idUser);
      formData.append('foto', foto[0]);
      formData.append('id', dados.id);
      formData.append('descricao', descricao);


      try {
         const response = await fetch('http://localhost/pets_esperto/petsEsperto/public/api/meusPets/update', {
            method: 'POST',
            headers: {
               'Authorization': `Bearer ${token}`,
            },
            body: formData,
         });
         if (!response.ok) throw new Error('Erro ao enviar dados');
         const data = await response.json();
         console.log('Dados enviados com sucesso:', data.status);
         if(data.status == "success"){ 
            alert("Deu certo, agora, vamos retornar para a página do tutor");
            navigate('/Cadastro/Pets'); 
           // navigate('/Cadastro/Pets'); 
         }
         //setMeusPets(data);

      } catch (error) {
         console.error('Erro ao enviar dados:', error);
      }
   };

   /*****************************************/
   /*****************************************/
   /*****************************************/
   /*****************************************/
   /*****************************************/

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
                  <form onSubmit={Update}>
                     <p><label>Nome: <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} />  </label></p>
                     <p>Meu Pet é um:<SelectPets value={animal} onChange={(e) => setAnimal(e.target.value)} /> </p>
                     <p>
                        <label>
                           descrição: <textarea name="descricao" onChange={(e) => setDescricao(e.target.value)}>{dados.descricao}</textarea>
                        </label>
                     </p>
                     <p>
                        <label>Foto do Pet:
                           <input className='form-control' type="file" id="fotoPet" name="foto" onChange={handleFotoChange} />
                        </label>
                     </p>
                     <p><figure>
                        <img src={`http://localhost/pets_esperto/petsEsperto/storage/app/public/${foto}`} />
                     </figure></p>
                     <button>Atualizar</button>
                  </form>
               )
               :
               (
                  <>
                     <p>Nome: {nome}</p>
                     <p>tipo: {animal}</p>
                     <p>descrição: {descricao}</p>
                     <p><figure>
                        <img src={`http://localhost/pets_esperto/petsEsperto/storage/app/public/${foto}`} />
                     </figure></p>


                  </>
               )
         }

      </>
   );
}

export default PetDados;
