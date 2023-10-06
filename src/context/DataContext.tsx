import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface DataContextType {
   jobTypes: string[];
   setJobTypes: (newValue: string[]) => void;
   locations: string[];
   setLocations: (newValue: string[]) => void;
   seniority: string[];
   setSeniority: (newValue: string[]) => void;
}

// export const initialData: DataContextType = {
//    jobTypes,
//    locations,
//    setLocations,
//    seniority,
//    setSeniority,
//    setJobTypes,
// };

export const DataContext = createContext<DataContextType | any>(undefined);

interface DataProviderProps {
   children: ReactNode;
}
const DataProvider = ({ children }: DataProviderProps) => {
   const [jobTypes, setJobTypes] = useState<string[] | any[]>([]);
   const [seniority, setSeniority] = useState<string[] | any[]>([]);
   const [locations, setLocations] = useState<string[] | any[]>([]);
   const contextValue: DataContextType = {
      jobTypes,
      setJobTypes,
      locations,
      setLocations,
      seniority,
      setSeniority,
   };

   return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export { DataProvider };
