import React, { useContext, useState } from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import FiltersContainer from './components/FiltersContainer/FiltersContainer';
import OffersContainer from './components/OffersContainer/OffersContainer';
import { DataContext } from './context/DataContext';
import OfferDetailsModal from './components/Modal/OfferDetailsModal';
import { ModalContext } from './context/ModalContext';

function App() {
   const { isModalOpen } = useContext(ModalContext);
   const { selectedOfferId } = useContext(DataContext);
   return (
      <Container>
         <FiltersContainer />
         <OffersContainer />
         {isModalOpen && selectedOfferId != null && <OfferDetailsModal id={selectedOfferId} />}{' '}
      </Container>
   );
}

export default App;
