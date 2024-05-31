import React from 'react';
import Login from './login';

import Dashboard from './Dashboard';
import DadosPessoais from './DadosPessoais';
import LarTemporario from './CadPets/LarTemporario';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pets from './CadPets/Pets';
import PetDados from './CadPets/PetDados';
import useAuth from '../jsEmGeral/useAuth';



function Menu() {
  return (
    <Router>
      <div>
        {/* Adicione links para Home e About */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>



            {/******************************************/}
            <li>
              <Link to="/Dashboard">Dashboard</Link>
              <ul>
                <li><Link to="/DadosPessoais">Dados Pessoais</Link></li>
                <li><Link to="/Cadastro/larTemporario">Lar Temporário</Link></li>
                <li><Link to="/Cadastro/Pets">Cadastrar Meu Pet</Link></li>
              </ul>
            </li>
            {/***********************************/}



          </ul>
        </nav>

        {/* Rotas para o conteúdo das páginas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/DadosPessoais" element={<DadosPessoais />} />
          <Route path="/Cadastro/larTemporario" element={<LarTemporario />} />
          <Route path="/Cadastro/Pets" element={<Pets />} />
          <Route path="/:tutor/pet/:nomePet" element={<PetDados />} />


        </Routes>
      </div>
    </Router>
  );
}




function Home() { return <h2>aqui é a home </h2>; }
function About() { return <h2>About</h2>; }


export default Menu;
