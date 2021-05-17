export const APIS = {
    USER: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
        RESET_PASSWORD: '/reset/password',
        GET_VERIFY_CODE: '/code/verify',
        VERIFY: '/verify',
    },
    MANAGE: {
        REVIEW_PROBLEM: '/review/problem',
        REVIEW_CONTEST: '/review/contest',

    },
    PROBLEM: {
        GET_PROBLEM_LIST: '/list/problem',
        UPLOAD_PROBLEM: '/upload/problem',
        COLLECT_PROBLEM: '/collect/problem',

    },
    CONTEST: {
        GET_CONTEST_LIST: '/list/contest',
    },
    DISCUSSION: {
        GET_DISCUSSION_LIST: '/list/discussion',

    },
    EVALUATION: {
        GET_EVALUATION_LIST: '/list/evaluation',
    }


}