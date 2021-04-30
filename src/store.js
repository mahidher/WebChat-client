import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";
const reducer = combineReducers({
  user: userLoginReducer,
});

const getUserIdfromLocalStorage = localStorage.getItem("userId")
  ? JSON.parse(localStorage.getItem("userId"))
  : {};
const initialState = {
  user: { userInfo: getUserIdfromLocalStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
