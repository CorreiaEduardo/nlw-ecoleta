import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'

import Header from '../../components/Header'
import './styles.css'

import { ecoletaApi, localidadesApi, IBGEUFResponse, IBGECityResponse } from '../../services/AxiosProvider'

import Dropzone from '../../components/Dropzone'
import Modal from '../../components/InfoModal';

interface Item {
    id: number,
    title: string,
    imageUrl: string
}

interface UF {
    id: number,
    abbreviation: string,
    name: string
}

interface City {
    id: number,
    name: string
}

const CreatePoint = () => {
    const [initialLatLgn, setInitialLatLgn] = useState<[number, number]>([0, 0]);
    const [items, setItems] = useState<Item[]>([]);

    const [ufs, setUfs] = useState<UF[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedLatLgn, setSelectedLatLgn] = useState<[number, number]>([0, 0]);
    const [selectedItems, setSelectedItems] = useState<number[]>([])

    const [selectedFile, setSelectedFile] = useState<File>()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });

    const [isModalVisible, setIsModalVisible] = useState(false)

    const history = useHistory()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialLatLgn([latitude, longitude])
            setSelectedLatLgn([latitude, longitude])
        }, err => {
            setInitialLatLgn([-15.7213868, -48.0777848])
            setSelectedLatLgn([-15.7213868, -48.0777848])
        })
    }, [])

    useEffect(() => {
        ecoletaApi.get('items').then(response => {
            setItems(response.data.items)
        });
    }, [])

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

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedUf(event.target.value);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedCity(event.target.value);
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedLatLgn([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    function handleSelectItem(itemId: number) {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId))
            return
        }
        setSelectedItems([...selectedItems, itemId])
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const { name, email, whatsapp } = formData
        const uf = selectedUf
        const city = selectedCity
        const [lat, lng] = selectedLatLgn

        const data = new FormData()

        data.append('name', name)
        data.append('email', email)
        data.append('whatsapp', whatsapp)
        data.append('uf', uf)
        data.append('city', city)
        data.append('lat', String(lat))
        data.append('lng', String(lng))
        data.append('items', selectedItems.join(','))

        if (selectedFile) {
            data.append('image', selectedFile)
        }

        await ecoletaApi.post('points', data)

        setIsModalVisible(true)
        setTimeout(() => history.push('/'), 3000)
    }

    return (
        <div id="page-create-point">
            <div className="content">
                <Header
                    ButtonIcon={FiArrowLeft}
                    buttonLabel='Voltar para a página inicial'
                    buttonDestination='/' />
                <main>
                    <form onSubmit={handleSubmit}>
                        <h1>Cadastro do ponto de coleta</h1>
                        <Dropzone onFileUploaded={setSelectedFile} />
                        <fieldset>
                            <legend>
                                <h2>Dados</h2>
                            </legend>

                            <div className="field">
                                <label htmlFor="name">Nome da entidade</label>
                                <input
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Insira o nome da entidade"
                                    name="name"
                                    id="name"
                                />
                            </div>

                            <div className="field-group">
                                <div className="field">
                                    <label htmlFor="email">E-mail</label>
                                    <input
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="Insira o e-mail da entidade"
                                        name="email"
                                        id="email"
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="whatsapp">Whatsapp</label>
                                    <input
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="Insira o nº de whatsapp da entidade"
                                        name="whatsapp"
                                        id="whatsapp"
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>
                                <h2>Endereço</h2>
                                <span>Selecione o endereço no mapa</span>
                            </legend>

                            <Map center={initialLatLgn} zoom={5} onClick={handleMapClick}>
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={selectedLatLgn} />
                            </Map>

                            <div className="field-group">
                                <div className="field">
                                    <label htmlFor="uf">Estado (UF)</label>
                                    <select
                                        name="uf"
                                        id="uf"
                                        value={selectedUf}
                                        onChange={handleSelectUf}>
                                        <option value="0">Selecione um estado</option>
                                        {ufs.map(uf => (
                                            <option
                                                key={`${uf.id}`}
                                                value={uf.abbreviation}>
                                                {uf.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="field">
                                    <label htmlFor="city">Cidade</label>
                                    <select
                                        name="city"
                                        id="city"
                                        value={selectedCity}
                                        onChange={handleSelectCity}>
                                        <option value="0">Selecione uma cidade</option>
                                        {cities.map(city => (
                                            <option
                                                key={`${city.id}`}
                                                value={city.name}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>
                                <h2>Itens de coleta</h2>
                                <span>Seleciona um ou mais itens abaixo</span>
                            </legend>

                            <ul className="items-grid">
                                {items.map((item, index) => (
                                    <li key={index} onClick={() => handleSelectItem(item.id)}
                                        className={selectedItems.includes(item.id) ? 'selected' : ''}>
                                        <img src={item.imageUrl} alt={item.title} />
                                        <span>{item.title}</span>
                                    </li>
                                ))}

                            </ul>
                        </fieldset>

                        <button type="submit">Cadastrar ponto de coleta</button>
                    </form>
                </main>
            </div>
            <Modal
                timerLabel='Voltando para a home em'
                timer={3}
                isVisible={isModalVisible}
                Icon={FiCheckCircle}
                title='Cadastro concluído!' />
        </div>
    );
}

export default CreatePoint;
