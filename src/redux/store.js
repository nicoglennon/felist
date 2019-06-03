import { createStore } from "redux";
import rootReducer from "./reducers";
const store = createStore(rootReducer, 
    // log store and dispatch in the redux devtools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;