import React, { useEffect, useState } from 'react';
import styles from './Checkbox.module.scss';
import { ReactComponent as UnCheckedIcon } from '@icons/UnCheckedIcon.svg';
import { ReactComponent as CheckedIcon } from '@icons/CheckedIcon.svg';

export interface CheckboxProps {
   label: string;
   checked: boolean;
   handleFilter: (value: string) => void;
}

export const Checkbox = ({ label, checked, handleFilter }: CheckboxProps) => {
   const [isChecked, setIsChecked] = useState(checked);

   const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
      event.stopPropagation();
      setIsChecked(!isChecked);
      handleFilter(label);
   };

   useEffect(() => {
      setIsChecked(checked);
   }, [checked]);

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
