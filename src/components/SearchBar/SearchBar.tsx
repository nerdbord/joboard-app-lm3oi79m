import React, { ChangeEvent, FC } from 'react';
import styles from './SearchBar.module.scss';
import placeLIcon from '@images/Place.svg';
import searchLIcon from '@images/Search.svg';
const SearchBar: React.FC<{
   localization: string;
   jobTitle: string;
   setLocalization: (value: string) => void;
   setJobTitle: (value: string) => void;
   onChangeLocation: (event: React.ChangeEvent<HTMLInputElement>) => void;
   onChangeJobTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
   locations: string[];
   jobTitles: string[];
}> = ({
   localization,
   jobTitle,
   onChangeLocation,
   onChangeJobTitle,
   locations,
   setLocalization,
   jobTitles,
   setJobTitle,
}) => {
   return (
      <div className={styles.container}>
         <div className={styles.inner}>
            <div className={styles.searchInput}>
               <div className={styles.input_logic}>
                  <input
                     className={styles.input}
                     type="text"
                     value={jobTitle}
                     onChange={onChangeJobTitle}
                     placeholder="Search for"
                  />
                  <button className={styles.inputIcon}>
                     <img src={searchLIcon} alt="" />
                  </button>
               </div>
               {jobTitles ? (
                  <>
                     {jobTitles
                        .filter((item) => {
                           const searchTerm = jobTitle.toLowerCase();
                           return (
                              searchTerm &&
                              item.toLowerCase().startsWith(searchTerm) &&
                              item.toLowerCase() !== searchTerm
                           );
                        })
                        .map((title) => {
                           <div
                              className={styles.dropdownElement}
                              onClick={() => {
                                 console.log(title);
                                 setJobTitle(title);
                              }}
                              key={title}
                           >
                              {jobTitles}
                           </div>;
                        })}
                  </>
               ) : null}
            </div>
            <div className={styles.searchInput}>
               <div className={styles.input_logic}>
                  <input
                     className={styles.input}
                     type="text"
                     value={localization}
                     onChange={onChangeLocation}
                     placeholder="Search location"
                  />
                  <button className={styles.inputIcon}>
                     <img src={placeLIcon} alt="" />
                  </button>
               </div>
               <div className={styles.dropdown}>
                  {locations ? (
                     <>
                        {' '}
                        {locations
                           .filter((item) => {
                              const searchTerm = localization.toLowerCase();

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
                                    setLocalization(location);
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
         </div>
      </div>
   );
};

export default SearchBar;
