import React, { createContext, useState, ReactNode } from 'react';

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
   //  openModal: (id: string) => void;
   //  closeModal: () => void;
   //  isModalOpen: boolean;
   //  setIsModalOpen: (newValue: boolean) => void;
   selectedOfferId: string | null;
   setSelectedOfferId: (newValue: string) => any;
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
   //  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
   const clearFilters = () => {
      setJobTypes([]);
      setSeniority([]);
      setLocations([]);
      setSliderValue(0);
   };

   //  const openModal = (id: string) => {
   //     setIsModalOpen((prevState) => !prevState);
   //  };
   //  const closeModal = () => {
   //     setIsModalOpen(false);
   //  };

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
      // isModalOpen,
      // setIsModalOpen,
      selectedOfferId,
      setSelectedOfferId,
      // openModal,
      // closeModal,
   };

   return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export { DataProvider };
