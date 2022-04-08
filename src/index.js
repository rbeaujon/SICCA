import React from 'react';
import { render } from 'react-dom';
import Session from './components/Session';
import Error from './components/Error';
import Home from './components/Home';
import Admin from './components/Admin';
import Users from './components/Users';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import store  from './store/index';

render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={ <Session />} />
          <Route path="*" element={ <Session /> } />
          <Route exact path="/" element={ <Session />} />
          <Route exact path="/admin" element={ <Admin />} />
          <Route exact path="/home" element={ <Home />} />
          <Route exact path="/error" element={ <Error />} />
          <Route exact path="/users" element={ <Users />} />
        </Routes>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

