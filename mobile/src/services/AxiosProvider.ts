import axios from 'axios';

export const ecoletaApi = axios.create({
    baseURL: 'http://192.168.0.105:3333/'
})

export const localidadesApi = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/'
})


export interface IBGEUFResponse {
    id: number,
    sigla: string,
    nome: string
}

export interface IBGECityResponse {
    id: number,
    nome: string
}