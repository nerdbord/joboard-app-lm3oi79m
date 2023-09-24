import React, { useEffect, useState } from 'react';
import styles from './OffersContainer.module.scss';
import OffersList from '../OffersList/OffersList';

import { useQuery } from 'react-query';
import { getJobOffers } from '../../services/offersApi';
import SearchBar from '../SearchBar/SearchBar';
import { OfferData } from '../../interfaces/OfferData';
import { JobOffers } from '../../interfaces/JobOffers';

const OffersContainer = () => {
   let { data, error, isLoading } = useQuery('jobOffers', getJobOffers);
   const [locations, setLocations] = useState<string[]>([]);
   const [jobTitles, setJobTitles] = useState<JobOffers[]>([]);
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

      let filteredData = data;

      if (jobTitle) {
         filteredData = filteredData.filter((offer: OfferData) =>
            offer.title.toLowerCase().startsWith(jobTitle.toLowerCase()),
         );
      }

      if (localization) {
         filteredData = filteredData.filter((offer: OfferData) =>
            offer.city.toLowerCase().startsWith(localization.toLowerCase()),
         );
      }

      setFilteredOffers(filteredData);

      const cities = filteredData.map((item: OfferData) => item.city);
      const searchOffers = filteredData.map((item: OfferData) => ({
         title: item.title,
         companyName: item.companyName,
      }));

      const notDuplicateCities = [...new Set(cities)];
      const notDuplicateTitles = [...new Set(searchOffers)];

      setLocations(notDuplicateCities as string[]);
      setJobTitles(notDuplicateTitles as JobOffers[]);
   };

   useEffect(() => {
      filterData();
   }, [data, localization, jobTitle]);

   const getOfferUI = () => {
      if (isLoading) {
         return <div>Loading...</div>;
      }

      if (error) {
         return <div>Error</div>;
      }

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

            {filteredOffers.length !== 0 ? (
               <OffersList offers={filteredOffers} />
            ) : (
               <div>No results found</div>
            )}
         </div>
      );
   };

   return <div className={styles.offers_container}>{getOfferUI()}</div>;
};

export default OffersContainer;
