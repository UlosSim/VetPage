import './index.css';

import App from './App.jsx';
import { DarkModeProvider } from './contexts/DarkModeContext.jsx';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
);
