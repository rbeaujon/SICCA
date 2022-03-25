import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import SessionContainer from './components/Session';
import LoginContainer from './components/Login';
import Home from './components/Home';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './store/index';

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={ <SessionContainer />} />
          <Route path="*" element={ <SessionContainer /> } />
          <Route exact path="/login" element={ <LoginContainer />} />
          <Route exact path="/admin" element={ <App />} />
          <Route exact path="/user" element={ <Home />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

