import React, { useState } from 'react';
import styles from './FilterSection.module.scss';
import { Checkbox } from '../Checkbox/Checkbox';

export interface FilterSectionProps {
   title: string;
   options: string[];
   jobTypes?: string[];
   seniority?: string[];
   locations?: string[];
   setLocations?: React.Dispatch<React.SetStateAction<string[]>>;
   setJobTypes?: React.Dispatch<React.SetStateAction<string[]>>;
   setSeniority?: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterSection = ({
   title,
   options,
   jobTypes = [],
   setJobTypes,
   locations = [],
   setLocations,
   seniority = [],
   setSeniority,
}: FilterSectionProps) => {
   const [isChecked, setIsChecked] = useState<boolean>(false);
   const handleFilter = (value: string) => {
      setIsChecked(!isChecked);

      if (setJobTypes) {
         jobTypes && jobTypes.includes(value)
            ? setJobTypes(jobTypes.filter((el) => el !== value))
            : setJobTypes((prevState: string[]) => [...prevState, value]);
      }

      if (setLocations) {
         locations && locations.includes(value)
            ? setLocations(locations.filter((el) => el !== value))
            : setLocations((prevState: string[]) => [...prevState, value]);
      }

      if (setSeniority) {
         seniority && seniority.includes(value)
            ? setSeniority(seniority.filter((el) => el !== value))
            : setSeniority((prevState: string[]) => [...prevState, value]);
      }
   };
   const stateValue = (label: string) => {
      const isLabelInJobTypes = jobTypes.includes(label);
      const isLabelInSeniority = seniority.includes(label);
      const isLabelInLocations = locations.includes(label);

      return isLabelInJobTypes || isLabelInSeniority || isLabelInLocations;
   };
   return (
      <div className={styles.filter_section_wrapper}>
         <p className={styles.filter_section_title}>{title}</p>
         <div className={styles.filter_section_checkbox}>
            {options.map((option) => (
               <Checkbox
                  key={option}
                  label={option}
                  checked={stateValue(option)}
                  handleFilter={handleFilter}
               />
            ))}
         </div>
      </div>
   );
};
export default FilterSection;
