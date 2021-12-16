import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import sp from './store';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <React.StrictMode>
  <Provider store={sp.store}>
  <PersistGate loading={null} persistor={sp.persistor}>
    <App />
   </PersistGate> 
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


