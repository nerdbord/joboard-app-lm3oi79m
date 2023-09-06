import React, { useState } from 'react';
import styles from './Checkbox.module.scss';
import { ReactComponent as UnCheckedIcon } from '@icons/UnCheckedIcon.svg';
import { ReactComponent as CheckedIcon } from '@icons/CheckedIcon.svg';

export interface CheckboxProps {
   onChange(event: React.ChangeEvent<HTMLInputElement>): void;

   label: string;
}

export const Checkbox = ({ label }: CheckboxProps) => {
   const [isChecked, setIsChecked] = useState<boolean>(true);
   return (
      <div className={styles.checkbox_wrapper}>
         <div
            className={styles.checkbox}
            onClick={(event) => {
               setIsChecked(!isChecked);
            }}
         >
            {isChecked ? <CheckedIcon /> : <UnCheckedIcon />}
            <input
               type="checkbox"
               checked={isChecked}
               onChange={(event) => {
                  setIsChecked(!isChecked);
               }}
               className={styles.hidden}
            />
         </div>
         <div>
            <label className={styles.label}>{label}</label>
         </div>
      </div>
   );
};
