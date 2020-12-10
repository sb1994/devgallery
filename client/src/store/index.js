import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";

// import { persistStore, persistReducer } from "redux-persist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const tokenFromLocalStorage = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const initalState = {
  user: {
    userInfo: tokenFromLocalStorage,
  },
};
const store = createStore(
  rootReducer,
  initalState,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
export default store;
