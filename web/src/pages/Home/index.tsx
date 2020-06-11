import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiLogIn, FiSearch } from 'react-icons/fi'

import { localidadesApi, IBGEUFResponse, IBGECityResponse } from '../../services/AxiosProvider'

import Header from '../../components/Header'
import FormModal from '../../components/FormModal'
import './styles.css'

interface UF {
    id: number,
    abbreviation: string,
    name: string
}

interface City {
    id: number,
    name: string
}

const Home = () => {

    const [isSearchModalVisible, setIsSearchModalVisible] = useState(false)
    const [ufs, setUfs] = useState<UF[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    useEffect(() => {
        localidadesApi.get<IBGEUFResponse[]>('estados', { params: { orderBy: 'nome' } }).then(response => {
            setUfs(response.data.map(uf => {
                return { id: uf.id, name: uf.nome, abbreviation: uf.sigla }
            }))
        });
    }, [])

    useEffect(() => {
        if (selectedUf === '0') return
        localidadesApi.get<IBGECityResponse[]>(`estados/${selectedUf}/municipios`, { params: { orderBy: 'nome' } }).then(response => {
            setCities(response.data.map(city => {
                return { id: city.id, name: city.nome }
            }))
        });
    }, [selectedUf])

    return (
        <div id="page-home">
            <div className="content">
                <Header
                    buttonDestination='/criar-ponto'
                    buttonLabel='Cadastrar um ponto de coleta'
                    ButtonIcon={FiLogIn} />
                <main>
                    <h1>Seu marketplace de coleta de resíduos</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

                    <button onClick={() => setIsSearchModalVisible(true)}>
                        <span><FiSearch /></span>
                        <strong>Pesquisar pontos de coleta</strong>
                    </button>
                </main>
            </div>
            <FormModal
                onFormSubmit={() => {}}
                action={'/ver-pontos'}
                handleCloseButtonClicked={() => setIsSearchModalVisible(false)}
                isVisible={isSearchModalVisible}
                title='Pontos de coleta em:'>
                <select
                    required
                    name="uf"
                    id="uf-search-modal"
                    value={selectedUf}
                    onChange={(event) => setSelectedUf(event.target.value)}>
                    <option value="">Selecione um estado</option>
                    {ufs.map(uf => (
                        <option
                            key={`${uf.id}`}
                            value={uf.abbreviation}>
                            {uf.name}
                        </option>
                    ))}
                </select>
                <select
                    required
                    name="city"
                    id="city-search-modal"
                    value={selectedCity}
                    onChange={(event) => setSelectedCity(event.target.value)}>
                    <option value="">Selecione uma cidade</option>
                    {cities.map(city => (
                        <option
                            key={`${city.id}`}
                            value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
                <button>Buscar</button>
            </FormModal>
        </div>
    );
}

export default Home;
