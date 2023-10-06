import React, { useState } from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import FiltersContainer from './components/FiltersContainer/FiltersContainer';
import OffersContainer from './components/OffersContainer/OffersContainer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DataProvider } from './context/DataContext';
const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <DataProvider>
            <Container>
               <FiltersContainer />
               <OffersContainer />
            </Container>
         </DataProvider>
      </QueryClientProvider>
   );
}

export default App;
