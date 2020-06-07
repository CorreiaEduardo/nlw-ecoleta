import axios from 'axios';

export const ecoletaApi = axios.create({
    baseURL: 'http://192.168.0.105:3333/'
})
