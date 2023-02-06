import React from 'react';
import ReactDOM from 'react-dom/client';
import { createPortal } from 'react-dom';
import './index.css';
import App from './App';
import { TodoContextProvider } from './TodoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TodoContextProvider>
        <App />
    </TodoContextProvider>
);
