import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reduser } from "./citiesReduser";
/* import { cityReduser } from "./cityReduser"; */

const redusers = combineReducers({
    cities : reduser,
    /* city : cityReduser */
})

export const store = createStore(redusers, composeWithDevTools())