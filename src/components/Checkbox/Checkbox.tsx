import React, { useState } from 'react';
import styles from './Checkbox.module.scss';
import { ReactComponent as UnCheckedIcon } from '@icons/UnCheckedIcon.svg';
import { ReactComponent as CheckedIcon } from '@icons/CheckedIcon.svg';

export interface CheckboxProps {
   setJobTypes?: any;
   jobTypes: string[];
   label: string;
}
export const Checkbox = ({ label, jobTypes, setJobTypes }: CheckboxProps) => {
   const [isChecked, setIsChecked] = useState<boolean>(false);

   function handleClick() {
      setIsChecked(!isChecked);
      if (setJobTypes) {
         if (jobTypes.includes(label)) {
            setJobTypes(jobTypes.filter((item) => item !== label));
         } else {
            setJobTypes([...jobTypes, label]);
         }
      } else {
         return;
      }
   }

   return (
      <div
         className={styles.checkbox_wrapper}
         onClick={handleClick}
         role="checkbox"
         aria-checked={isChecked ? 'true' : 'false'}
      >
         <div className={styles.checkbox}>{isChecked ? <CheckedIcon /> : <UnCheckedIcon />}</div>
         <div>
            <label className={styles.label}>{label}</label>
         </div>
      </div>
   );
};
