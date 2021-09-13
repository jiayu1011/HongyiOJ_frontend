import React from 'react'
import ReactDOM from 'react-dom'


import {BrowserRouter} from 'react-router-dom'
import { renderRoutes } from "react-router-config";
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

