import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; // Combined reducer

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) // Middleware for handling async actions
);

export default store;
