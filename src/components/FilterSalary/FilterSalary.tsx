// FilterSalary.tsx

import React, { useState } from 'react';
import * as styles from './FilterSalary.module.scss';

interface FilterSalaryProps {
   title: string;
   sliderValue: number;
   setSliderValue: (newValue: number) => void;
   salaryLevels: { min: number; max: number };
}

export const FilterSalary = ({ sliderValue, setSliderValue }: FilterSalaryProps) => {
   const left = sliderValue / 1255;
   function handleSalary(event: React.ChangeEvent<HTMLInputElement>) {
      const newValue = parseInt(event.target.value);
      setSliderValue(newValue);
   }

   return (
      <div className={styles.slider_container}>
         <span className={styles.filter_section_title}>Salary (min.)</span>

         <input
            type="range"
            min="0"
            max="120000"
            step="1500"
            value={sliderValue}
            onChange={handleSalary}
            className={styles.slider_filter}
         />
         <div className={styles.current_value} style={{ left: `${left}%` }}>
            {sliderValue}
         </div>
      </div>
   );
};
