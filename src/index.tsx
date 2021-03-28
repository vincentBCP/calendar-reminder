import React from 'react';
import ReactDOM from 'react-dom';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Provider store={store}>
            <App />  
        </Provider>
    </MuiPickersUtilsProvider>,
    document.getElementById('root')
);
