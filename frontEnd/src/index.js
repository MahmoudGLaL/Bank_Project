import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@fortawesome/fontawesome-free/css/all.min.css"

import App from './App';
import { NextUIProvider } from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from "next-themes";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NextUIProvider>
  <NextThemesProvider attribute="class"   defaultTheme="light">
      <App />
  </NextThemesProvider>
</NextUIProvider>

);


