import React from 'react';
import styles from './FiltersContainer.module.scss';
import { FilterSection } from '../FilterSection/FilterSection';
import { FilterSalary } from '../FilterSalary/FilterSalary';

const FiltersContainer = () => {
   return (
      <div className={styles.container}>
         <header className={styles.header}>
            <p className={styles.header_title}>Filter offers</p>
            <button className={styles.clear_button}>Clear filters</button>
         </header>
         <section>
            <FilterSection title="Job Type" />
            <FilterSection title="Seniority" />
            <FilterSection title="Location" />
            <FilterSalary />
         </section>
      </div>
   );
};
export default FiltersContainer;
