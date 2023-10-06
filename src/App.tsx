import React, { useEffect, useState } from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import FiltersContainer from './components/FiltersContainer/FiltersContainer';
import OffersContainer from './components/OffersContainer/OffersContainer';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
interface SalaryLevelsData {
   min: number;
   max: number;
}
function App() {
   const [jobTypes, setJobTypes] = useState<string[] | any[]>([]);
   const [seniority, setSeniority] = useState<string[] | any[]>([]);
   const [locations, setLocations] = useState<string[] | any[]>([]);
   const [sliderValue, setSliderValue] = useState<number>(10000);
   const [salaryLevels, setSalaryLevels] = useState<SalaryLevelsData>({ min: 1, max: 20000 });

   useEffect(() => {
      console.log(sliderValue);
      console.log(salaryLevels.min, salaryLevels.max);
   }, [sliderValue]);

   return (
      <QueryClientProvider client={queryClient}>
         <Container>
            <FiltersContainer
               jobTypes={jobTypes}
               setJobTypes={setJobTypes}
               locations={locations}
               setLocations={setLocations}
               sliderValue={sliderValue}
               setSliderValue={setSliderValue}
               salaryLevels={salaryLevels}
               setSalaryLevels={setSalaryLevels}
               seniority={seniority}
               setSeniority={setSeniority}
            />
            <OffersContainer
               jobTypes={jobTypes}
               locations={locations}
               salaryLevels={salaryLevels}
               setSalaryLevels={setSalaryLevels}
               seniority={seniority}
               sliderValue={sliderValue}
            />
         </Container>
      </QueryClientProvider>
   );
}

export default App;
