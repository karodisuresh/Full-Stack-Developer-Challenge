// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
