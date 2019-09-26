import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { loadUser } from './store/actions/auth';
import { getUniversities } from './store/actions/info';

store.dispatch(loadUser());
store.dispatch(getUniversities());

ReactDOM.render(
    <App />
, document.getElementById('root'));
registerServiceWorker();
