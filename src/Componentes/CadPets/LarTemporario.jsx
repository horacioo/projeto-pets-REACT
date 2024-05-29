import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../jsEmGeral/useAuth';
import { SalvarDAdosLarTemp, buscaDoServidor } from '../../jsEmGeral/fetchUserData';
import CustomInput from '../formularios/customInput';



function LarTemporario(){ 


    const [idUser, setIdUser] = useState(window.sessionStorage.getItem("UserId"));
    const [token, setToken] = useState(window.sessionStorage.getItem("token"));
    /*****************************************************************************/
     const [larTemp, setLartemp] = useState();
     const [message, setMessage]=useState();
     const [animal, setanimal]= useState();
     const [qtd, setQtd] = useState();

    /***************Saber se o sujeito se logou**********************************/
     useAuth(idUser,token);
     /*****************************************************************************/

     useAuth(idUser, token)

     useEffect(()=>{ if(larTemp==1){ setMessage("Oferece lar temporário") } else { setMessage("Não oferece lar temporário") }  })


      /************Recebe dados iniciais SE Tiver**********************/ 
      useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await buscaDoServidor(token, idUser, 'http://localhost/pets_esperto/petsEsperto/public/api/larTemp/react/dadosIniciais');
                if (data === null) {
                    setLartemp(0);
                } else {
                   setLartemp(data.dados.disponivel);
                   setQtd(data.dados.vagas);
                   setanimal(data.dados.tipo);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do servidor:', error);
            }
        };

        fetchData();
    }, [token, idUser]);
      /****************************************************************/



      

     
      /**************envia para o servidor*****************************/  
     const SalvarDados = async(event)=>{
        event.preventDefault();
        setMessage("preparando para salvar");
        try{
            const data = {
                animal:animal,
                vaga:larTemp,
                quantidade:qtd,
                user_id: idUser,
            }

            const response = await SalvarDAdosLarTemp(token,data, 'http://localhost/pets_esperto/petsEsperto/public/api/larTemporario/save');
        } catch(error){}
     }/*****************************************************************/ 


    return(<>
    <label>Ofereço lar temporário? 
         sim:<input name='larTemp' type='radio' value={1} onChange={(e)=> setLartemp(e.target.value)} /> 
         Não:<input name='larTemp' type='radio' value={0} onChange={(e)=>setLartemp(e.target.value) } />
    </label><p/>





    {
    larTemp == 1 && <>
            tipo<select value={animal}  name='animal' onChange={(e)=> setanimal(e.target.value)}>
                <option value={1}>cachorro</option>
                <option value={2}>gatos</option>
                <option value={3}>Cachorros E gatos</option>
                <option value={4}>outros</option>
            </select>
            <p /><label>vagas:<input type="number" value={qtd} name='vagas' onChange={(e)=>setQtd(e.target.value)}/></label>
    </>
    }


   <p/> <button onClick={SalvarDados}>Salvar</button>
    </> ) 
}

export default LarTemporario;