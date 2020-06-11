import React from 'react';
import { Link } from 'react-router-dom'
import { FiLogIn, FiSearch } from 'react-icons/fi'

import Header from '../../components/Header'
import './styles.css'

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <Header
                    buttonDestination='/criar-ponto'
                    buttonLabel='Cadastrar um ponto de coleta'
                    ButtonIcon={FiLogIn}/>
                <main>
                    <h1>Seu marketplace de coleta de resíduos</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

                    <Link to="/ver-pontos">
                        <span><FiSearch /></span>
                        <strong>Pesquisar pontos de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default Home;
