// import { original } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const logMiddlewere = ({ getState }) => (next) => (action) => {
  console.log(action.type, getState());
  return next(action);
}

const stringMiddlewere = () => (next) => (action) => {
  if (typeof action  === 'string') {
    return next({
      type: action
    });
  }
  return next(action);
}

// const store = createStore(reducer, applyMiddleware(stringMiddlewere, logMiddlewere));
// подключили thunk
const store = createStore(reducer, applyMiddleware(
  thunkMiddleware, stringMiddlewere, logMiddlewere));

const delayedActionCreator = (timeout) => (dispatch) => {
  setTimeout(() => dispatch({
    type: 'DELAYED_ACTION'
  }), timeout);
};

store.dispatch(delayedActionCreator(3000 ));
store.dispatch('HELLO WORLD');

export default store;