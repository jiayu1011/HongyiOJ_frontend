import Forget from "../views/Login/Forget";
import Problems from "../views/Index/Problems/Problems";
import Contests from "../views/Index/Contests/Contests";
import Home from "../views/Index/Home/Home";
import Discussions from "../views/Index/Discusstions/Discussions";
import NotFound from "../components/NotFound";
import Login2 from "../views/Login/Login2";
import Index2 from "../views/Index/Index2";
import ProblemInfo from "../views/Index/Problems/ProblemInfo/ProblemInfo";
import ContestInfo from "../views/Index/Contests/ContestInfo/ContestInfo";
import ProblemList from "../views/Index/Problems/ProblemList/ProblemList";
import ContestList from "../views/Index/Contests/ContestList/ContestList";
import Manage from "../views/Manage/Manage";
import Review from "../views/Manage/Review/Review";
import UploadProblem from "../views/Index/UploadProblem/UploadProblem";
import Mobile from "../components/Mobile";


function getToken() {
    return sessionStorage.getItem('token')
}


const routes = [
    {
        path: '/mobile',
        component: Mobile,
    },
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
                component: Problems,
                routes: [
                    {
                        path: '/problems/list',
                        exact: true,
                        component: ProblemList,
                    },
                    {
                        path: '/problems/info/:problemId',
                        exact: true,
                        component: ProblemInfo,
                    },
                ]
            },
            {
                path: '/contests',
                component: Contests,
                routes: [
                    {
                        path: '/contests/list',
                        exact: true,
                        component: ContestList,
                    },
                    {
                        path: '/contests/info/:contestId',
                        exact: true,
                        component: ContestInfo,
                    },
                ]
            },
            {
                path: '/discussions',
                component: Discussions,
            },
            {
                path: '/uploadProblem',
                component: UploadProblem,
            },
            {
                path: '/manage',
                component: Manage,
                routes: [
                    {
                        path: '/manage/reviewProblems',
                        exact: true,
                        component: Review,
                    }
                ]
            },
            //若并没有匹配到上述所有路径则404,此部分一定要放到最后面
            {
                path: '*',
                component: NotFound
            }

        ]
    },


]

export default routes