import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage]   = useState('');
    const navigate = useNavigate();
    
    const handleUsernameChange = (event) => { setUsername(event.target.value); };
    const handlePasswordChange = (event) => { setPassword(event.target.value); };
    

      /*************************************************************************/
      const handleLogin = async () => {


        console.log("Username:", username);
        console.log("Password:", password);


        try {
          const response = await fetch('http://localhost/pets_esperto/petsEsperto/public/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: username,
              password: password
            })
          });
    
          if (!response.ok) { throw new Error('Erro ao fazer login');  }

    
          const data = await response.json();
          console.log('Token de acesso:', data.token); // Exemplo: assumindo que a API retorna um token de acesso
          setMessage(data.message);
          window.sessionStorage.setItem("token",data.token);
          window.sessionStorage.setItem("UserId",data.id);
          navigate('/dashboard'); 

    
        } catch (error) {
          console.error('Erro ao fazer login:', error);
          setMessage("erro");
        }
      };
      /*************************************************************************/


      return (
        <div id="meuLogin">
                <div>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username} 
                  onChange={handleUsernameChange} 
                />
                </div>
            
                <div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={handlePasswordChange} 
                /></div>
           
                <button onClick={handleLogin}>Login</button>
                <div id="mensagem">{message}</div>
        </div>
      );


}

export default Login;