import axios from 'axios'
import { message } from 'antd'
message.config({ maxCount: 3 })

// const MOCK_API = 'http://127.0.0.1:8000/HongyiOJ/';
const MOCK_API = 'http://119.29.24.77:8000/HongyiOJ/';

// const whiteApi = ['login', 'register', 'send/code', 'reset/password']


const http = axios.create({
    baseURL: MOCK_API,
    timeout: 1000 * 60 * 3
})



export default http