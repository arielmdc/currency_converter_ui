import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './utils/Routes';
import history from './utils/history';
import './App.less';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
