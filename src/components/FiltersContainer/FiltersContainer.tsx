import React from 'react';
import styles from './FiltersContainer.module.scss';
import { FilterSection } from '../FilterSection/FilterSection';
import { FilterSalary } from '../FilterSalary/FilterSalary';

interface FilterOptions {
   'Job type': string[];
   Seniority: string[];
   Location: string[];
}

interface FilterContainerProps {
   jobTypes: string[];
   setJobTypes: (newValue: string[]) => void;
   locations: string[];
   setLocations: (newValue: string[]) => void;
   seniority: string[];
   setSeniority: (newValue: string[]) => void;
}

const FiltersContainer = ({
   setJobTypes,
   jobTypes,
   locations,
   setLocations,
   seniority,
   setSeniority,
}: FilterContainerProps) => {
   const filterOptions: FilterOptions = {
      'Job type': ['Full-time', 'Part-time', 'Freelance', 'Contract'],
      Seniority: ['Lead', 'Expert', 'Senior', 'Mid/Regular', 'Junior', 'Intern'],
      Location: ['Remote', 'Part-remote', 'On-site'],
   };
   const salary = 14000;

   const jobTypesFiltered = jobTypes.filter((type) => filterOptions['Job type'].includes(type));

   return (
      <div className={styles.container}>
         <header className={styles.header}>
            <p className={styles.header_title}>Filter offers</p>
            <button className={styles.clear_button}>Clear filters</button>
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

            <FilterSalary />
         </section>
      </div>
   );
};

export default FiltersContainer;
