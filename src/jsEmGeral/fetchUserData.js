// src/services/api.js

const UrlBase = "http://localhost/pets_esperto/petsEsperto/public/api/";
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
export const fetchUserData = async (token, userId) => {
    const response = await fetch('http://localhost/pets_esperto/petsEsperto/public/api/cadastro/react/dadosPessoais', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userId })
    });

    if (!response.ok) {
        throw new Error('Erro ao acessar a API');
    }

    return response.json();
};
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/





/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
export const saveUserData = async (data, verbo='POST',url='http://localhost/pets_esperto/petsEsperto/public/api/cadastro/save') => {
    const response = await fetch(url, {
        method: verbo,
        headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Erro ao acessar a API');
    }

    return response.json();
};
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
export const BuscarNoServidor = async (data, verbo = 'GET', url = 'http://localhost/pets_esperto/petsEsperto/public/api/cadastro/save') => {
    let apiUrl = url;

    // Se for uma solicitação GET e houver dados, adicione-os à URL
    if (verbo === 'GET' && data) {
        const queryString = Object.keys(data)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
            .join('&');
        
        apiUrl += `?${queryString}`;
    }

    const response = await fetch(apiUrl, {
        method: verbo,
        headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json'
        },
        // Não inclua o corpo na solicitação GET
        body: verbo !== 'GET' ? JSON.stringify(data) : undefined
    });

    if (!response.ok) {
        throw new Error('Erro ao acessar a API');
    }

    return response.json();
};


/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/

export const SalvarDAdosLarTemp = async(token,data, url) =>{

    

    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Erro ao acessar a API');
    }
    return response.json();
}

/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/





/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
export const buscaDoServidor = async (token, userId, url) => {


    ///if(url.lenght < 20) { } else{  url = UrlBase+url;  }


    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
    });

    if (!response.ok) {
        throw new Error('Erro ao acessar a API');
    }

    return response.json();
};
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/