import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'


import {BrowserRouter, HashRouter} from 'react-router-dom'
import { renderRoutes } from "react-router-config";
import { Provider } from 'react-redux'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import store from "./store";
import routes from "./route";


import 'antd/dist/antd.css'

import './style/index.scss'




ReactDOM.render(

    <BrowserRouter>
        {renderRoutes(routes)}
    </BrowserRouter>,
    document.getElementById('root')
);

