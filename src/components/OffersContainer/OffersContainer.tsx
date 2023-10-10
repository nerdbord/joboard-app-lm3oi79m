import React, { useEffect, useState } from 'react';
import styles from './OffersContainer.module.scss';
import OffersList from '../OffersList/OffersList';

import { useQuery } from 'react-query';
import { getJobOffers } from '../../services/offersApi';
import SearchBar from '../SearchBar/SearchBar';
import { OfferData } from '../../interfaces/OfferData';
import { JobOffers } from '../../interfaces/JobOffers';
import { DataContext } from '../../context/DataContext';
import { useContext } from 'react';

const OffersContainer = () => {
   const { jobTypes, locations, seniority, sliderValue } = useContext(DataContext);
   const [localization, setLocalization] = useState('');
   const [jobTitle, setJobTitle] = useState('');
   const [seniorities, setSeniorities] = useState<string[]>([]);

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

   function handleClearFilters() {
      setJobTitle('');
      setLocalization('');
      setSeniorities([]);
      getFilteredJobOffers();
   }

   const getFilteredJobOffers = async () => {
      const response = await getJobOffers();

      const filteredData = response.filter((offer: OfferData) => {
         const titleMatch =
            !jobTitle || offer.title.toLowerCase().startsWith(jobTitle.toLowerCase());
         const localizationMatch =
            !localization || offer.city.toLowerCase().startsWith(localization.toLowerCase());
         const jobTypeMatch =
            jobTypes.length === 0 ||
            jobTypes.some((jobType: string) => offer.jobType.includes(jobType));
         const locationMatch =
            locations.length === 0 ||
            locations.some((location: string) => offer.workLocation.includes(location));
         const seniorityMatch =
            seniority.length === 0 ||
            seniority.some((rank: string) => offer.seniority.includes(rank));
         const slider = sliderValue <= offer.salaryFrom;
         return (
            titleMatch &&
            localizationMatch &&
            jobTypeMatch &&
            locationMatch &&
            seniorityMatch &&
            slider
         );
      });

      const cities = filteredData.map((item: OfferData) => item.city);
      const searchOffers = filteredData.map((item: OfferData) => ({
         title: item.title,
         companyName: item.companyName,
      }));
      const ranks = filteredData.map((item: OfferData) => item.seniority);

      const notDuplicateCities = [...new Set(cities)];
      const notDuplicateTitles = [...new Set(searchOffers)];
      const notDuplicateSeniorities = [...new Set(ranks)];

      setSearchLocations(notDuplicateCities as string[]);
      setSeniorities(notDuplicateSeniorities as string[]);
      setJobTitles(notDuplicateTitles as JobOffers[]);
      setData(filteredData);

      return filteredData;
   };

   useEffect(() => {
      getFilteredJobOffers();
   }, [jobTypes, locations, seniority, sliderValue]);

   const { error, isLoading } = useQuery(
      ['jobOffers', localization, jobTitle, seniorities],
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
