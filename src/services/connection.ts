import Axios from 'axios';
import appConfig from '../config/appConfig';

export const baseurl =appConfig.BASEURL

const token = localStorage.getItem('token');
const headers = {
    'Authorization': token,
    'Content-Type': 'application/json'
}

export const headerFunctions =()=>{
    const token = localStorage.getItem('token');
    return {
        'Authorization': token,
        'Content-Type': 'application/json'
    }
}



