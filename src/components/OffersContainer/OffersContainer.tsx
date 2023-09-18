import React, { useEffect, useState } from 'react';
import styles from './OffersContainer.module.scss';
import OffersList from '../OffersList/OffersList';

import { useQuery } from 'react-query';
import { getJobOffers } from '../../services/offersApi';
import SearchBar from '../SearchBar/SearchBar';
import { OfferData } from '../../interfaces/OfferData';

const OffersContainer = () => {
   let { data, error, isLoading } = useQuery('jobOffers', getJobOffers);
   const [locations, setLocations] = useState<string[]>([]);
   const [jobTitles, setJobTitles] = useState<string[]>([]);
   const [filteredOffers, setFilteredOffers] = useState<OfferData[]>([]);
   const [localization, setLocalization] = useState('');
   const [jobTitle, setJobTitle] = useState('');

   const onChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalization(event.target.value);
   };
   const onChangeJobTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setJobTitle(event.target.value);
   };

   const filterData = () => {
      if (!data) return [];

      if (jobTitle && !localization) {
         const filteredDataByTitle = data.filter((offer: OfferData) =>
            offer.title.toLowerCase().startsWith(jobTitle.toLowerCase()),
         );
         setFilteredOffers(filteredDataByTitle);
      } else if (!jobTitle && !localization) {
         setFilteredOffers(data);
      }

      if (localization && !jobTitle) {
         const filteredDataByLocalization = data.filter((offer: OfferData) =>
            offer.city.toLowerCase().startsWith(localization.toLowerCase()),
         );
         setFilteredOffers(filteredDataByLocalization);
      } else if (!jobTitle && !localization) {
         setFilteredOffers(data);
      }

      if (localization && jobTitle) {
         const filteredDataByLocalizationAndTitle = data
            .filter((offer: OfferData) =>
               offer.city.toLowerCase().startsWith(localization.toLowerCase()),
            )
            .filter((offer: OfferData) =>
               offer.title.toLowerCase().startsWith(jobTitle.toLowerCase()),
            );
         setFilteredOffers(filteredDataByLocalizationAndTitle);
      } else if (!jobTitle && !localization) {
         setFilteredOffers(data);
      }
   };

   useEffect(() => {
      if (data) {
         const cities = data.map((item: OfferData) => item.city);
         const titles = data.map((item: OfferData) => item.title);
         const notDuplicateCities = [...new Set(cities)];
         const notDuplcateTitles = [...new Set(titles)];
         setLocations(notDuplicateCities as string[]);
         setJobTitles(notDuplcateTitles as string[]);
      }
   }, [data]);

   useEffect(() => {
      filterData();
      console.log(filteredOffers);
   }, [data, localization, jobTitle]);

   const getOfferUI = () => {
      if (isLoading) {
         return <div>Loading...</div>;
      }
      if (error) {
         return <div>Error</div>;
      }
      if (data) {
         return (
            <div className={styles.container}>
               <SearchBar
                  localization={localization}
                  setLocalization={setLocalization}
                  jobTitle={jobTitle}
                  setJobTitle={setJobTitle}
                  onChangeLocation={onChangeLocation}
                  onChangeJobTitle={onChangeJobTitle}
                  locations={locations}
                  jobTitles={jobTitles}
               />
               <span className={styles.offers_counter}>{filteredOffers.length} offers found</span>

               {filteredOffers.length != 0 ? (
                  <OffersList offers={filteredOffers} />
               ) : (
                  <div>No results found</div>
               )}
            </div>
         );
      }
   };

   return <div className={styles.offers_container}>{getOfferUI()}</div>;
};

export default OffersContainer;
