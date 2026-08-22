import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import './styles/tokens.css';
import './styles/breakpoints.css';
import './styles/global.css';
import './styles/buttons.css';
import './styles/case-content.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/LucilaPortfolio">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
