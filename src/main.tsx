// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/context/ThemeProvider";

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// This is typically at the bottom of main.tsx
if ('serviceWorker' in navigator) {
  // Only register in production
  if (import.meta.env.PROD) {
    navigator.serviceWorker.register('/service-worker.js');
  }
}

<ThemeProvider>
  <App />
</ThemeProvider>