import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from '../reducer';
import thunk from "redux-thunk";

const store = createStore(
  rootReducer, 
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
  );

export default store;