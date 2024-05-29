import React, { useState, useEffect } from 'react';
import CustomInput from './formularios/customInput';
import { useNavigate } from 'react-router-dom';
import { fetchUserData, saveUserData } from '../jsEmGeral/fetchUserData';
import useAuth from  '../jsEmGeral/useAuth';


function DadosPessoais() {
    const [email, setEmail] = useState('');
    const [idUser, setIdUser] = useState(window.sessionStorage.getItem("UserId"));
    const [token, setToken] = useState(window.sessionStorage.getItem("token"));
    const [responseInfo, setResponseInfo] = useState('');
    const [celular, setCelular] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const navigate = useNavigate();

    
    useAuth(idUser, token);


    
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUserData(token, idUser);
                setIdUser(data.id);
                setEmail(data.user.email);
                setCelular(data.dados.celular);
                setCep(data.dados.cep);
                setEndereco(data.dados.endereco);
                setNumero(data.dados.numero);
                setComplemento(data.dados.complemento);
                setBairro(data.dados.bairro);
                setCidade(data.dados.cidade);
                setUf(data.dados.uf);
            } catch (error) {
                console.error('Erro ao acessar a API:', error);
            }
        };

        fetchData();
    }, [token, idUser]);
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/





/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
    const handleSubmit = async (event) => {
        event.preventDefault();
        setResponseInfo("Preparando os dados");

        try {
            const data = {
                token: window.sessionStorage.getItem("token"),
                user_id: idUser,
                email,
                celular,
                cep,
                endereco,
                numero,
                complemento,
                bairro,
                cidade,
                uf
            };
            const response = await saveUserData(data);

            if (response.codigo === 1) {
                setResponseInfo("Dados atualizados com sucesso!");
            } else {
                setResponseInfo("Problema ao enviar os dados");
            }

            console.log('Dados enviados com sucesso!');
        } catch (error) {
            console.error('Erro ao acessar a API:', error);
            setResponseInfo('Erro ao acessar a API: ' + error.message);
        }
    };
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/



    return (
        <>
            <h2>Meus dados pessoais:</h2>
            <form id='dadosPessoais' onSubmit={handleSubmit}>
                <CustomInput label="email" nulo={1} value={email} onChange={(e) => setEmail(e.target.value)} />
                <CustomInput label="Telefone" value={celular} onChange={(e) => setCelular(e.target.value)} />
                <CustomInput label="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                <CustomInput label="Numero" value={numero} onChange={(e) => setNumero(e.target.value)} />
                <CustomInput label="Cep" value={cep} onChange={(e) => setCep(e.target.value)} />
                <CustomInput label="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                <CustomInput label="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                <CustomInput label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                <CustomInput label="Estado" value={uf} onChange={(e) => setUf(e.target.value)} />

                <button type='submit' id='submit'>Alterar</button>
                <div>{responseInfo}</div>
            </form>
        </>
    );
}

export default DadosPessoais;