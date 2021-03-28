import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import reminderReducer from './store/reducers/reminder';

const rootReducer = combineReducers({
    reminder: reminderReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />  
    </Provider>,
    document.getElementById('root')
);
