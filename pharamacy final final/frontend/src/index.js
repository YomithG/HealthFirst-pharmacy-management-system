import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FeedbacksContextProvider } from './context/FeedbackContext';
import { ComplaintsContextProvider } from './context/ComplaintContext';
import { SalaryContextProvider } from './context/SalaryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <FeedbacksContextProvider>
    <ComplaintsContextProvider>
    <SalaryContextProvider>
    <App />
   </SalaryContextProvider>
    </ComplaintsContextProvider>
    </FeedbacksContextProvider>
   
  </React.StrictMode>
);

reportWebVitals();
