import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.87.1:8080/api';
//const baseURL = 'https://backend-mern.up.railway.app/api';
const mernAPI = axios.create({baseURL});

mernAPI.interceptors.request.use(
    async (config:any) => {
        const token = await AsyncStorage.getItem('token');
        if (token){
            config.headers['x-token'] = token;
        }
        return config;
    }
);

export default mernAPI;
