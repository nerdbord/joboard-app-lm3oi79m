import React from 'react';
import styles from './OffersContainer.module.scss';
import OffersList from '../OffersList/OffersList';
import { Search } from '../Search/Search';
import { useQuery } from 'react-query';
import { getJobOffers } from '../../services/offersApi';
const jobOffers = [
   {
      id: 1,
      title: 'frontend',
      companyName: 'name',
      companyLocation: 'location',
      companyJobType: 'hybrid',
      companySeniority: 'trainee',
      companyLogo: 'img',
      companySalary: '200',
   },
];

const OffersContainer = () => {
   const { data, error, isLoading } = useQuery('jobOffers', getJobOffers);

   const getOfferUI = () => {
      if (isLoading) {
         return <div>Loading...</div>;
      }
      if (error) {
         return <div>Error</div>;
      }
      if (data) {
         return (
            <>
               <span className={styles.offers_counter}>{data.length} offers found</span>
               <OffersList offers={data} />
            </>
         );
      }
   };
   return (
      <div>
         <Search />
         {getOfferUI()}
      </div>
   );
};

export default OffersContainer;
