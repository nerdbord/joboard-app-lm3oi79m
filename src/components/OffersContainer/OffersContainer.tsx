import React, { useEffect, useState } from 'react';
import styles from './OffersContainer.module.scss';
import OffersList from '../OffersList/OffersList';

import { useQuery } from 'react-query';
import { getJobOffers } from '../../services/offersApi';
import SearchBar from '../SearchBar/SearchBar';
import { OfferData } from '../../interfaces/OfferData';
import { JobOffers } from '../../interfaces/JobOffers';
interface OffersContainerProps {
   jobTypes: string[];
   locations: string[];
}
const OffersContainer = ({ jobTypes, locations }: OffersContainerProps) => {
   const [localization, setLocalization] = useState('');
   const [jobTitle, setJobTitle] = useState('');

   const [searchLocations, setSearchLocations] = useState<string[]>([]);
   const [jobTitles, setJobTitles] = useState<JobOffers[]>([]);
   const [data, setData] = useState<OfferData[]>([]);

   const onChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setLocalization(event.target.value);
   };
   const onChangeJobTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setJobTitle(event.target.value);
   };

   const getFilteredJobOffers = async () => {
      const response = await getJobOffers();
      const filteredData = response.filter((offer: OfferData) => {
         if (jobTitle && !offer.title.toLowerCase().startsWith(jobTitle.toLowerCase())) {
            return false;
         }
         if (localization && !offer.city.toLowerCase().startsWith(localization.toLowerCase())) {
            return false;
         }
         if (jobTypes.length > 0 && !jobTypes.some((jobType) => offer.jobType.includes(jobType))) {
            return false;
         }
         if (
            locations.length > 0 &&
            !locations.some((location) => offer.workLocation.includes(location))
         ) {
            return false;
         }

         return true;
      });

      const cities = filteredData.map((item: OfferData) => item.city);
      const searchOffers = filteredData.map((item: OfferData) => ({
         title: item.title,
         companyName: item.companyName,
      }));

      const notDuplicateCities = [...new Set(cities)];
      const notDuplicateTitles = [...new Set(searchOffers)];

      setSearchLocations(notDuplicateCities as string[]);
      setJobTitles(notDuplicateTitles as JobOffers[]);
      setData(filteredData);

      return filteredData;
   };
   useEffect(() => {
      getFilteredJobOffers();
   }, [jobTypes, locations]);

   const { error, isLoading } = useQuery(
      ['jobOffers', localization, jobTitle],
      getFilteredJobOffers,
   );

   const getOfferUI = () => {
      if (isLoading) {
         return <div>Loading...</div>;
      }

      if (error) {
         return <div>Error</div>;
      }

      return <>{data.length !== 0 ? <OffersList offers={data} /> : <div>No results found</div>}</>;
   };

   return (
      <div className={styles.offers_container}>
         <div className={styles.container}>
            <SearchBar
               localization={localization}
               setLocalization={setLocalization}
               jobTitle={jobTitle}
               setJobTitle={setJobTitle}
               onChangeLocation={onChangeLocation}
               onChangeJobTitle={onChangeJobTitle}
               locations={searchLocations}
               jobTitles={jobTitles}
            />
            <span className={styles.offers_counter}>{data.length} offers found</span>

            {getOfferUI()}
         </div>
      </div>
   );
};

export default OffersContainer;
