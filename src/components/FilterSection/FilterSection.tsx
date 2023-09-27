import React from 'react';
import styles from './FilterSection.module.scss';
import { Checkbox } from '../Checkbox/Checkbox';

interface FilterSectionProps {
   title: string;
   options: string[];
}

export const FilterSection = ({ title, options }: FilterSectionProps) => {
   return (
      <div className={styles.filter_section_wrapper}>
         <p className={styles.filter_section_title}>{title}</p>
         <div className={styles.filter_section_checkbox}>
            {options.map((option) => (
               <Checkbox key={option} label={option} onChange={() => console.log(option)} />
            ))}
         </div>
      </div>
   );
};
