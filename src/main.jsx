import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './features/ecos-experiencias.css'; // ECOS_EXPERIENCIAS_V1
import './player-compacto.css';
import './ecos-mobile-site-inteiro.css'; // ECOS_MOBILE_SITE_INTEIRO_V1

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
