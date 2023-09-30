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
   seniority: string[];
   salaryLevels: { min: number; max: number };
   setSalaryLevels: React.Dispatch<{ min: number; max: number }>;
}

const OffersContainer = ({
   jobTypes,
   locations,
   salaryLevels,
   setSalaryLevels,
   seniority,
}: OffersContainerProps) => {
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

   const getFilteredJobOffers = async () => {
      const salariesFrom: number[] = [];
      const salariesTo: number[] = [];
      const response = await getJobOffers();

      const filteredData = response.filter((offer: OfferData) => {
         const titleMatch =
            !jobTitle || offer.title.toLowerCase().startsWith(jobTitle.toLowerCase());
         const localizationMatch =
            !localization || offer.city.toLowerCase().startsWith(localization.toLowerCase());
         const jobTypeMatch =
            jobTypes.length === 0 || jobTypes.some((jobType) => offer.jobType.includes(jobType));
         const locationMatch =
            locations.length === 0 ||
            locations.some((location) => offer.workLocation.includes(location));
         const seniorityMatch =
            seniority.length === 0 || seniority.some((rank) => offer.seniority.includes(rank));

         return titleMatch && localizationMatch && jobTypeMatch && locationMatch && seniorityMatch;
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

      filteredData.map((item: any) => {
         salariesFrom.push(item.salaryFrom);
         salariesTo.push(item.salaryTo);
         setSalaryLevels({ min: Math.min(...salariesFrom), max: Math.max(...salariesTo) });
      });

      return filteredData;
   };

   useEffect(() => {
      getFilteredJobOffers();
   }, [jobTypes, locations, seniority]);

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
