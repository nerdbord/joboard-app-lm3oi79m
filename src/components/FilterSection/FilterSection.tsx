import React from 'react';
import styles from './FilterSection.module.scss';
import { Checkbox } from '../Checkbox/Checkbox';

interface FilterSectionProps {
   title: string;
   options: string[];
   jobTypes?: string[];
   seniority?: string[];
   locations?: string[];
   setLocations?: any;
   setJobTypes?: any;
   setSeniority?: any;
}

export const FilterSection = ({
   title,
   options,
   jobTypes,
   setJobTypes,
   locations,
   setLocations,
   seniority,
   setSeniority,
}: FilterSectionProps) => {
   return (
      <div className={styles.filter_section_wrapper}>
         <p className={styles.filter_section_title}>{title}</p>
         <div className={styles.filter_section_checkbox}>
            {options.map((option) => (
               <Checkbox
                  key={option}
                  label={option}
                  jobTypes={jobTypes}
                  setJobTypes={setJobTypes}
                  locations={locations}
                  setLocations={setLocations}
                  seniority={seniority}
                  setSeniority={setSeniority}
                  // tu powino być 1-2 props
               />
            ))}
         </div>
      </div>
   );
};
