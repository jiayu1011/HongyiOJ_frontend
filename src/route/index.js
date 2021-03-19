import App from "../App";
import Login from "../views/Login/Login";
import Forget from "../views/Login/Forget";
import Index from "../views/Index";
import Problems from "../views/Index/Problems/Problems";

import Contests from "../views/Index/Contests/Contests";
import Home from "../views/Index/Home/Home";
import Discussions from "../views/Index/Discusstions/Discussions";
import NotFound from "../components/NotFound";
import Login2 from "../views/Login/Login2";
import Index2 from "../views/Index/Index2";
import Redirect from "../components/Redirect";


function getToken() {
    return sessionStorage.getItem('token')
}


const routes = [
    {
        path: '/login',
        component: Login2,
    },
    {
        path: '/forget',
        component: Forget,

    },

    {
        path: '/',
        // exact: true,
        component: Index2,

        routes: [
            {
                path: '/home',
                component: Home,
            },
            {
                path: '/problems',
                exact: true,
                component: Problems,
            },
            {
                path: '/contests',
                component: Contests,
            },
            {
                path: '/discussions',
                component: Discussions,
            },
            {
                path: '*',
                component: Redirect,
            }





        ]
    },


]

export default routes