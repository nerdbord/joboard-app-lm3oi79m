import React, { useEffect, useState } from 'react';
import styles from './Checkbox.module.scss';
import { ReactComponent as UnCheckedIcon } from '@icons/UnCheckedIcon.svg';
import { ReactComponent as CheckedIcon } from '@icons/CheckedIcon.svg';

export interface CheckboxProps {
   label: string;
   jobTypes?: string[];
   setJobTypes?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
   locations?: string[];
   setLocations?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
   seniority?: string[];
   setSeniority?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

export const Checkbox = ({
   label,
   jobTypes = [],
   setJobTypes,
   locations = [],
   setLocations,
   seniority = [],
   setSeniority,
}: CheckboxProps) => {
   const [isChecked, setIsChecked] = useState(
      jobTypes.includes(label) || seniority.includes(label) || locations.includes(label),
   );

   useEffect(() => {
      setIsChecked(
         jobTypes.includes(label) || seniority.includes(label) || locations.includes(label),
      );
   }, [jobTypes, locations, seniority, label]);

   function handleClick() {
      setIsChecked(!isChecked);

      const stateMap: Record<
         string,
         {
            state: string[] | undefined;
            setState: React.Dispatch<React.SetStateAction<string[] | undefined>> | undefined;
         }
      > = {
         jobTypes: { state: jobTypes, setState: setJobTypes },
         locations: { state: locations, setState: setLocations },
         seniority: { state: seniority, setState: setSeniority },
      };

      for (const key in stateMap) {
         if (stateMap.hasOwnProperty(key)) {
            const { state, setState } = stateMap[key];

            if (state && setState) {
               if (state.includes(label)) {
                  setState(state.filter((item) => item !== label));
               } else {
                  setState([...state, label]);
               }

               return;
            }
         }
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
