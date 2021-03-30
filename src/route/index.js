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
import ProblemInfo from "../views/Index/Problems/ProblemInfo/ProblemInfo";
import ContestInfo from "../views/Index/Contests/ContestInfo/ContestInfo";


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
                path: '/problems/:problemId',
                exact: true,
                component: ProblemInfo,
            },
            {
                path: '/contests',
                exact: true,
                component: Contests,
            },
            {
                path: '/contests/:contestId',
                exact: true,
                component: ContestInfo,
            },
            {
                path: '/discussions',
                component: Discussions,
            },
            //若并没有匹配到上述所有路径则404
            {
                path: '*',
                component: NotFound
            }






        ]
    },


]

export default routes