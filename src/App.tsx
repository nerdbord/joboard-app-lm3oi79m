import React, { useContext, useState } from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import FiltersContainer from './components/FiltersContainer/FiltersContainer';
import OffersContainer from './components/OffersContainer/OffersContainer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DataContext, DataProvider } from './context/DataContext';
import OfferDetailsModal from './components/Modal/OfferDetailsModal';
const queryClient = new QueryClient();

function App() {
   const { selectedOfferId, isModalOpen } = useContext(DataContext);
   return (
      <Container>
         <FiltersContainer />
         <OffersContainer />
         {isModalOpen && selectedOfferId != null && <OfferDetailsModal id={selectedOfferId} />}{' '}
      </Container>
   );
}

export default App;
