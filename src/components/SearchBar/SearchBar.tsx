import React, { ChangeEvent, FC } from 'react';
import styles from './SearchBar.module.scss';
import placeLIcon from '@images/Place.svg';
import searchLIcon from '@images/Search.svg';
import { JobOffers } from '../../interfaces/JobOffers';
const SearchBar: React.FC<{
   localization: string;
   jobTitle: string;
   setLocalization: (value: string) => void;
   setJobTitle: (value: string) => void;
   onChangeLocation: (event: React.ChangeEvent<HTMLInputElement>) => void;
   onChangeJobTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
   locations: string[];
   jobTitles: JobOffers[];
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
   const formatTitle = (title: string, searchTerm: string) => {
      if (!searchTerm) {
         return title;
      }

      const lowerCaseTitle = title.toLowerCase();
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      if (lowerCaseTitle.includes(lowerCaseSearchTerm)) {
         const startIndex = lowerCaseTitle.indexOf(lowerCaseSearchTerm);
         const endIndex = startIndex + lowerCaseSearchTerm.length;

         return (
            <>
               {title.substring(0, startIndex)}
               <strong>{title.substring(startIndex, endIndex)}</strong>
               {title.substring(endIndex)}
            </>
         );
      }

      return title;
   };

   return (
      <div className={styles.container}>
         <div className={styles.inner}>
            <div className={styles.allElements}>
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
                        <img src={searchLIcon} alt="Search icon" />
                     </button>
                  </div>
               </div>
               <div className={styles.dropdown}>
                  {jobTitles ? (
                     <>
                        {jobTitles
                           .filter((item) => {
                              const searchTerm = jobTitle.toLowerCase();

                              return (
                                 searchTerm &&
                                 item.title.toLowerCase().startsWith(searchTerm) &&
                                 item.title.toLowerCase() !== searchTerm
                              );
                           })
                           .map((job) => (
                              <div
                                 className={styles.dropdownElement}
                                 onClick={() => {
                                    setJobTitle(job.title);
                                 }}
                                 key={job.title}
                              >
                                 <div>{formatTitle(job.title, jobTitle)}</div>
                                 <small>{job.companyName}</small>
                              </div>
                           ))}
                     </>
                  ) : null}
               </div>
            </div>
            <div className={styles.allElements}>
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
                        <img src={placeLIcon} alt="Place icon" />
                     </button>
                  </div>
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
                                 <div>{formatTitle(location, localization)}</div>
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
