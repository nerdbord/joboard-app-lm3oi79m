import React from 'react';
import styles from './OffersContainer.module.scss';
import OffersList from '../OffersList/OffersList';
import { Search } from '../Search/Search';
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
   return (
      <div>
         <Search />
         <span className={styles.offers_counter}>36 offers found</span>
         <OffersList offers={jobOffers} />
         <OffersList offers={jobOffers} />
         <OffersList offers={jobOffers} />
         <OffersList offers={jobOffers} />
      </div>
   );
};

export default OffersContainer;
