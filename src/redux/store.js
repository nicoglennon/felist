import { createStore } from "redux";
import rootReducer from "./reducers";
import {loadState, saveState} from "./localStorage";
import throttle from "lodash/throttle";

const persistedState = loadState();
const store = createStore(rootReducer, persistedState,
    // log store and dispatch in the redux devtools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// I use throttle to lower the amount of times we save the state. 
// We save state every 1200ms in order to not call the JSON.stringify method too often.
store.subscribe(throttle(() => {
    saveState({
        refactoredData: store.getState().refactoredData,
        currentListId: store.getState().currentListId,
    })
    console.log('Changes saved to localStorage! 🙌');
}, 1200))
export default store;