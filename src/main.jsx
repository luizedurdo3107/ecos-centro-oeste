import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './features/ecos-experiencias.css'; // ECOS_EXPERIENCIAS_V1
import './player-compacto.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
