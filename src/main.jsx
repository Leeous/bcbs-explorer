'use strict';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Cookies from 'universal-cookie';
import App from './App';

const cookies = new Cookies();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
