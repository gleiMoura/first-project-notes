import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './templates/Home';
import './global-styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Home postsPerPage={10}/>
  </React.StrictMode>,
)
