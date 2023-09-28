import React, { useEffect, useState } from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import FiltersContainer from './components/FiltersContainer/FiltersContainer';
import OffersContainer from './components/OffersContainer/OffersContainer';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
function App() {
   const [jobTypes, setJobTypes] = useState<string[] | any[]>([]);

   return (
      <QueryClientProvider client={queryClient}>
         <Container>
            <FiltersContainer jobTypes={jobTypes} setJobTypes={setJobTypes} />
            <OffersContainer jobTypes={jobTypes} />
         </Container>
      </QueryClientProvider>
   );
}

export default App;
