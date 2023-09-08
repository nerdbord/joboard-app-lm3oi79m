import React, { FC } from 'react';
import styles from './SearchBar.module.scss';

const SearchBar: React.FC<{
   value: string;
   setValue: (value: string) => void;
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

   locations: string[];
}> = ({ value, onChange, locations, setValue }) => {
   return (
      <div className={styles.container}>
         <div className={styles.inner}>
            <input type="text" value={value} onChange={onChange} />
            <button>Search </button>
         </div>
         <div className={styles.dropdown}>
            {locations ? (
               <>
                  {' '}
                  {locations
                     .filter((item) => {
                        const searchTerm = value.toLowerCase();

                        return (
                           searchTerm &&
                           item.toLowerCase().startsWith(searchTerm) &&
                           item.toLowerCase() !== searchTerm
                        );
                     })
                     .map((location) => (
                        <div
                           className={styles.dropdownElement}
                           onClick={() => {
                              setValue(location);
                           }}
                           key={location}
                        >
                           {' '}
                           {location}
                        </div>
                     ))}
               </>
            ) : null}
         </div>
      </div>
   );
};

export default SearchBar;
