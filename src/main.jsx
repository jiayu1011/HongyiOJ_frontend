import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'


import {BrowserRouter, HashRouter} from 'react-router-dom'
import {BrowserRouter as Router,Link,Route,Redirect,Switch} from 'react-router-dom'
import { renderRoutes } from "react-router-config";
import { Provider } from 'react-redux'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import http from "./utils/http";
import store from "./store";
import routes from "./route";

import * as _ from "lodash";
import moment from 'moment';

React.$http = http;

import 'antd/dist/antd.css'

import './style/index.scss'
import Login from "./views/Login/Login";
import Forget from "./views/Login/Forget";
import Index from "./views/Index/Index";
import Problems from "./views/Index/Problems/Problems";
import Home from "./views/Index/Home/Home";




ReactDOM.render(
    // <BrowserRouter>
    //     <Switch>
    //         <Route exact path='/' component={Index}/>
    //         <Route exact path='/login' component={Login}/>
    //         <Route exact path='/forget' component={Forget}/>
    //
    //
    //     </Switch>
    // </BrowserRouter>,
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <BrowserRouter>
                {renderRoutes(routes)}
            </BrowserRouter>

        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);

