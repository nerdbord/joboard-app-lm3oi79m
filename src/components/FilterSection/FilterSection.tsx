import React from 'react';
import styles from './FilterSection.module.scss';
import { Checkbox } from '../Checkbox/Checkbox';

interface FilterSectionProps {
   title: string;
}

export const FilterSection = ({ title }: FilterSectionProps) => {
   return (
      <div className={styles.filter_section_wrapper}>
         <p className={styles.filter_section_title}>{title}</p>
         <div className={styles.filter_section_checkbox}>
            <Checkbox label="text1" onChange={() => console.log('checked1')} />
            <Checkbox label="text2" onChange={() => console.log('checked2')} />
            <Checkbox label="text2" onChange={() => console.log('checked3')} />
         </div>
      </div>
   );
};
