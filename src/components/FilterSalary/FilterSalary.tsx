import React, { ChangeEvent } from 'react';
import * as styles from './FilterSalary.module.scss';

interface FilterSalaryProps {
   title: string;
   sliderValue: number;
   setSliderValue: (newValue: number) => void;
   salaryLevels: { min: number; max: number };
   setSalaryLevels: React.Dispatch<{ min: number; max: number }>;
}
export const FilterSalary = ({
   title,
   sliderValue,
   setSliderValue,
   salaryLevels,
   setSalaryLevels,
}: FilterSalaryProps) => {
   function handleSalary(event: React.ChangeEvent<HTMLInputElement>) {
      setSliderValue(parseInt(event.target.value));
   }

   return (
      <div className={styles.filter_section_wrapper}>
         <p className={styles.filter_section_title}>{title}</p>
         <div className={styles.slidecontainer}>
            <input
               type="range"
               min={salaryLevels.min}
               max={salaryLevels.max}
               value={sliderValue}
               className={styles.slider}
               id="myRange"
               onChange={handleSalary}
            />
         </div>
      </div>
   );
};
