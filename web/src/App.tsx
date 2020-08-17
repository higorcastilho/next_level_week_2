import React from 'react';

import Routes from './routes'

import { AuthProvider } from './context/AuthContext'

import './assets/styles/global.css'

function App() {
  return (
  	<AuthProvider>
    	<Routes />
  	</AuthProvider>
  );
}

export default App;
