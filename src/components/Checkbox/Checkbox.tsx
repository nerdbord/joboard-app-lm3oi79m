import React, { useState } from 'react';
import styles from './Checkbox.module.scss';
import { ReactComponent as UnCheckedIcon } from '@icons/UnCheckedIcon.svg';
import { ReactComponent as CheckedIcon } from '@icons/CheckedIcon.svg';

export interface CheckboxProps {
   setJobTypes?: any;
   jobTypes?: string[];
   label: string;
   locations?: string[];
   setLocations?: any;
   seniority?: string[];
   setSeniority?: any;
}
export const Checkbox = ({
   label,
   jobTypes,
   setJobTypes,
   locations,
   setLocations,
   seniority,
   setSeniority,
}: CheckboxProps) => {
   const [isChecked, setIsChecked] = useState<boolean>(false);
   function handleClick() {
      // handleclick ma zwracać tylko stan isChecked
      setIsChecked(!isChecked);

      const stateMap: Record<
         string,
         {
            state: string[] | undefined;
            setState: React.Dispatch<React.SetStateAction<string[]>> | undefined;
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

               return; //koniec cykla
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
