import axios from 'axios';

const urlDev = 'https://op.gg/api/v1.0/internal/bypass/';
const urlProd = 'https://op.gg/api/v1.0/internal/bypass/';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? urlDev : urlProd,
});

export {
    api,
    urlDev
}