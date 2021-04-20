import axios from 'axios'
import { message } from 'antd'
message.config({ maxCount: 3 })

// const MOCK_API = 'http://rap2api.taobao.org/app/mock/279706/get';
const DEPLOY_API = 'http://119.29.24.77:8000/HongyiOJ';

// const whiteApi = ['login', 'register', 'send/code', 'reset/password']


const http = axios.create({
    baseURL: DEPLOY_API,
    timeout: 1000 * 60 * 3
})



export default http