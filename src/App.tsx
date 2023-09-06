import React from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import FiltersContainer from './components/FiltersContainer/FiltersContainer';
import OffersContainer from './components/OffersContainer/OffersContainer';

function App() {
   return (
      <Container>
         <h1>👾 JO–BOARD</h1>
         <FiltersContainer />
         <OffersContainer />
      </Container>
   );
}

export default App;
