import {Problems} from "../views/Index/Problems/Problems";
import {Contests} from "../views/Index/Contests/Contests";
import {Home} from "../views/Index/Home/Home";
import {Discussions} from "../views/Index/Discusstions/Discussions";
import {NotFound} from "../components/NotFound";
import {Login} from "../views/Login/Login";
import {Index} from "../views/Index/Index";
import {ProblemInfo} from "../views/Index/Problems/ProblemInfo/ProblemInfo";
import {ContestInfo} from "../views/Index/Contests/ContestInfo/ContestInfo";
import {ProblemList} from "../views/Index/Problems/ProblemList/ProblemList";
import {ContestList} from "../views/Index/Contests/ContestList/ContestList";
import {Manage} from "../views/Index/Manage/Manage";
import {ReviewProblems} from "../views/Index/Manage/ReviewProblems/ReviewProblems";
import {UploadProblem} from "../views/Index/UploadProblem/UploadProblem";
import {Mobile} from "../components/Mobile";
import {Forget} from "../views/Login/Forget";
import {ProblemSubmit} from "../views/Index/Problems/ProblemSubmit/ProblemSubmit";
import {DiscussionList} from "../views/Index/Discusstions/DiscussionList/DiscussionList";
import {EvaluationList} from "../views/Index/EvaluationList/EvaluationList";




const routes = [
    {
        path: '/mobile',
        component: Mobile,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/forget',
        component: Forget,
    },
    {
        path: '/',
        // exact: true,
        component: Index,

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
                        path: '/problems/:problemId',
                        exact: true,
                        component: ProblemInfo,
                    },
                    {
                        path: '/problems/:problemId/submit',
                        exact: true,
                        component: ProblemSubmit,
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
                        path: '/contests/:contestId',
                        exact: true,
                        component: ContestInfo,
                    },
                ]
            },
            {
                path: '/discussions',
                component: Discussions,
                routes: [
                    {
                        path: '/discussions/list',
                        exact: true,
                        component: DiscussionList
                    }
                ]
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
                        component: ReviewProblems,
                    }
                ]
            },
            {
                path: '/evaluationList',
                component: EvaluationList,
            },
            //??????????????????????????????????????????404,?????????????????????????????????
            {
                path: '*',
                component: NotFound
            }

        ]
    },


]

export default routes