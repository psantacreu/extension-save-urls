import React from 'react';
import { createRoot } from 'react-dom/client';
import { Popup } from './Popup';
import '../styles.css';

const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>
); 