import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './app/App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb'
    },
    secondary: {
      main: '#0f766e'
    },
    background: {
      default: '#f7f8fb'
    }
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  shape: {
    borderRadius: 8
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

