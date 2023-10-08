import React from 'react';
import styles from './FiltersContainer.module.scss';
import { FilterSection } from '../FilterSection/FilterSection';
import { FilterSalary } from '../FilterSalary/FilterSalary';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';

interface FilterOptions {
   'Job type': string[];
   Seniority: string[];
   Location: string[];
}

const FiltersContainer = () => {
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

   return (
      <div className={styles.container}>
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

            <FilterSection
               key="Seniority"
               title="Seniority"
               seniority={seniority}
               setSeniority={setSeniority}
               options={filterOptions['Seniority']}
            />
            <FilterSection
               key="Location"
               title="Location"
               locations={locations}
               setLocations={setLocations}
               options={filterOptions['Location']}
            />

            <FilterSalary
               title="Salary(min.)"
               sliderValue={sliderValue}
               setSliderValue={setSliderValue}
               salaryLevels={salaryLevels}
            />
         </section>
      </div>
   );
};

export default FiltersContainer;
