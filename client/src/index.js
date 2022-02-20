import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import { SearchProvider } from './context/SelectContext';

ReactDOM.render(
  <SearchProvider>
    <AuthProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
    </AuthProvider>
  </SearchProvider>,
  document.getElementById('root')
);
