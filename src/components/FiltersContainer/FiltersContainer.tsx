import React from 'react';
import styles from './FiltersContainer.module.scss';
import { FilterSection } from '../FilterSection/FilterSection';
import { FilterSalary } from '../FilterSalary/FilterSalary';
interface FilterOptions {
   'Job type': string[];
   Seniority: string[];
   Location: string[];
}
const FiltersContainer = () => {
   const filterSections: (keyof FilterOptions)[] = ['Job type', 'Seniority', 'Location'];
   const filterOptions: FilterOptions = {
      'Job type': ['Full-time', 'Part-time', 'Freelance', 'Contract'],
      Seniority: ['Lead', 'Expert', 'Senior', 'Mid/Regular', 'Junior', 'Intern'],
      Location: ['Remote', 'Part-remote', 'On-site'],
      // Tutaj można dodać inne opcje dotyczące wynagrodzenia
   };
   const salary = 14000;
   return (
      <div className={styles.container}>
         <header className={styles.header}>
            <p className={styles.header_title}>Filter offers</p>
            <button className={styles.clear_button}>Clear filters</button>
         </header>
         <section>
            {filterSections.map((section) => (
               <FilterSection key={section} title={section} options={filterOptions[section]} />
            ))}

            <FilterSalary />
         </section>
      </div>
   );
};
export default FiltersContainer;
