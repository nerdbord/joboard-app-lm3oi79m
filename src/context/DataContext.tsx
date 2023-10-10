import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface DataContextType {
   jobTypes: string[];
   setJobTypes: (newValue: string[]) => void;
   locations: string[];
   setLocations: (newValue: string[]) => void;
   seniority: string[];
   setSeniority: (newValue: string[]) => void;
   sliderValue: number;
   setSliderValue: (newValue: number) => void;
   salaryLevels: SalaryLevelsData;
   setSalaryLevels: (newValue: SalaryLevelsData) => void;
   clearFilters: () => void;
}
interface SalaryLevelsData {
   min: number;
   max: number;
}

export const DataContext = createContext<DataContextType | any>(undefined);

interface DataProviderProps {
   children: ReactNode;
}
const DataProvider = ({ children }: DataProviderProps) => {
   const [jobTypes, setJobTypes] = useState<string[] | any[]>([]);
   const [seniority, setSeniority] = useState<string[] | any[]>([]);
   const [locations, setLocations] = useState<string[] | any[]>([]);
   const [sliderValue, setSliderValue] = useState<number>(0);
   const [salaryLevels, setSalaryLevels] = useState<SalaryLevelsData>({ min: 0, max: 160000 });
   const clearFilters = () => {
      // setJobTypes([]);
      // setSeniority([]);
      // setSeniority([]);
      // setSliderValue(0);
   };

   const contextValue: DataContextType = {
      jobTypes,
      setJobTypes,
      locations,
      setLocations,
      seniority,
      setSeniority,
      sliderValue,
      setSliderValue,
      salaryLevels,
      setSalaryLevels,
      clearFilters,
   };

   return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export { DataProvider };
