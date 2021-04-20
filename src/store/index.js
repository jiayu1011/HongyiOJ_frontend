import {createStore, applyMiddleware, compose} from 'redux'
import reducer, {initialState} from "./reducers";


const store = createStore(
    reducer,
    initialState,
    //chrome中激活redux devtools插件
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store