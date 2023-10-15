import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DataProvider } from './context/DataContext';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <DataProvider>
            <App />
         </DataProvider>
      </QueryClientProvider>
   </React.StrictMode>,
);
