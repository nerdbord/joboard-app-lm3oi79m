import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './FiltersContainer.module.scss';
import { FilterSection } from '../FilterSection/FilterSection';
import { FilterSalary } from '../FilterSalary/FilterSalary';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import Button from '../Button/Button';

interface FilterOptions {
   'Job type': string[];
   Seniority: string[];
   Location: string[];
}

const FiltersContainer = () => {
   const isMobile = useMediaQuery('(max-width:768px)');
   const [showFilters, setShowFilters] = useState(false);
   const {
      jobTypes,
      locations,
      setLocations,
      seniority,
      setSeniority,
      setJobTypes,
      sliderValue,
      setSliderValue,
      salaryLevels,
      clearFilters,
   } = useContext(DataContext);
   const filterOptions: FilterOptions = {
      'Job type': ['Full-time', 'Part-time', 'Freelance', 'Contract'],
      Seniority: ['Lead', 'Expert', 'Senior', 'Mid/Regular', 'Junior', 'Intern'],
      Location: ['Remote', 'Part-remote', 'On-site'],
   };

   const jobTypesFiltered = jobTypes.filter((type: string) =>
      filterOptions['Job type'].includes(type),
   );
   const handleToggle = () => {
      setShowFilters(!showFilters);
   };

   return (
      <>
         {isMobile ? (
            <header className={styles.mobile_header}>
               <h1>👾 JO–BOARD</h1>
               <Button variant={showFilters ? 'open' : 'close'} onClick={handleToggle}>
                  {showFilters ? 'Filter offers' : 'Close'}
               </Button>
            </header>
         ) : (
            <></>
         )}
         <div className={styles.filter_wrapper}>
            <h1 className={styles.logo}>👾 JO–BOARD</h1>
            <div className={`${styles.container} ${showFilters && styles.hidden}`}>
               <header className={styles.header}>
                  <p className={styles.header_title}>Filter offers</p>
                  <button className={styles.clear_button} onClick={clearFilters}>
                     Clear filters
                  </button>
               </header>
               <section>
                  <FilterSection
                     key="Job type"
                     title="Job type"
                     jobTypes={jobTypesFiltered}
                     setJobTypes={setJobTypes}
                     options={filterOptions['Job type']}
                  />
                  <div className={styles.line}></div>
                  <FilterSection
                     key="Seniority"
                     title="Seniority"
                     seniority={seniority}
                     setSeniority={setSeniority}
                     options={filterOptions['Seniority']}
                  />
                  <div className={styles.line}></div>
                  <FilterSection
                     key="Location"
                     title="Location"
                     locations={locations}
                     setLocations={setLocations}
                     options={filterOptions['Location']}
                  />
                  <div className={styles.line}></div>

                  <FilterSalary
                     title="Salary(min.)"
                     sliderValue={sliderValue}
                     setSliderValue={setSliderValue}
                     salaryLevels={salaryLevels}
                  />
               </section>
            </div>
         </div>
      </>
   );
};

export default FiltersContainer;
