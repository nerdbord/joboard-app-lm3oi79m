import React from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import FiltersContainer from './components/FiltersContainer/FiltersContainer';
import OffersContainer from './components/OffersContainer/OffersContainer';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <Container>
            <FiltersContainer />
            <OffersContainer />
         </Container>
      </QueryClientProvider>
   );
}

export default App;
