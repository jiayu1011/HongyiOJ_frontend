import {createStore, applyMiddleware, compose} from 'redux'
import reducers, {initialState} from "./reducers";


const store = createStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//chrome中激活redux devtools插件
);

export default store