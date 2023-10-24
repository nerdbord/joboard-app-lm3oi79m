// import React, { useContext, useEffect, useState } from 'react';
// import styles from './Checkbox.module.scss';
// import { ReactComponent as UnCheckedIcon } from '@icons/UnCheckedIcon.svg';
// import { ReactComponent as CheckedIcon } from '@icons/CheckedIcon.svg';
// import { DataContext } from '../../context/DataContext';

// export interface CheckboxProps {
//    label: string;
//    checked: boolean;
//    handleFilter: (value: string) => void;
// }

// export const Checkbox = ({ label, checked, handleFilter }: CheckboxProps) => {
//    const { clearFilters } = useContext(DataContext);
//    const [isChecked, setIsChecked] = useState<boolean>(checked);
//    const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
//       event.stopPropagation();
//       setIsChecked(!isChecked);
//       handleFilter(label);
//    };
//    useEffect(() => {
//       setIsChecked(isChecked);
//    }, [checked, clearFilters]);
//    return (
//       <div
//          className={styles.checkbox_wrapper}
//          onClick={handleClick}
//          role="checkbox"
//          aria-checked={checked ? 'true' : 'false'}
//       >
//          <div className={styles.checkbox}>{checked ? <CheckedIcon /> : <UnCheckedIcon />}</div>
//          <div>
//             <label className={styles.label}>{label}</label>
//          </div>
//       </div>
//    );
// };
// export default Checkbox;
import React, { useContext, useEffect, useState } from 'react';
import styles from './Checkbox.module.scss';
import { ReactComponent as UnCheckedIcon } from '@icons/UnCheckedIcon.svg';
import { ReactComponent as CheckedIcon } from '@icons/CheckedIcon.svg';
import { DataContext } from '../../context/DataContext';

export interface CheckboxProps {
   label: string;
   checked: boolean;
   handleFilter: (value: string) => void;
}

export const Checkbox = ({ label, checked, handleFilter }: CheckboxProps) => {
   //  const { clearFilters } = useContext(DataContext);
   const [isChecked, setIsChecked] = useState(checked);

   const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
      event.stopPropagation();
      setIsChecked(!isChecked);
      handleFilter(label);
   };

   useEffect(() => {
      // Update the isChecked state when the 'checked' prop changes
      setIsChecked(checked);
   }, [checked]);

   return (
      <div
         className={styles.checkbox_wrapper}
         onClick={handleClick}
         role="checkbox"
         aria-checked={isChecked ? 'true' : 'false'} // Use 'isChecked' here
      >
         <div className={styles.checkbox}>{isChecked ? <CheckedIcon /> : <UnCheckedIcon />}</div>
         <div>
            <label className={styles.label}>{label}</label>
         </div>
      </div>
   );
};
