import React from 'react';
import styles from './OffersList.module.scss';
import Offer from '../Offer/Offer';
import { OfferData } from '../../interfaces/OfferData';

interface OffersListProps {
   offers: OfferData[];
}

const OffersList: React.FC<OffersListProps> = ({ offers }) => {
   if (!offers) {
      return null;
   }
   return (
      <div className={styles.container}>
         <ul className={styles.list}>
            {offers.map((offer) => (
               <li key={offer._id} className={styles.list_element}>
                  <Offer
                     _id={offer._id}
                     title={offer.title}
                     city={offer.city}
                     companyName={offer.companyName}
                     createdAt={offer.createdAt}
                     currency={offer.currency}
                     description={offer.description}
                     jobType={offer.jobType}
                     offerUrl={offer.offerUrl}
                     salaryFrom={offer.salaryFrom}
                     salaryTo={offer.salaryTo}
                     seniority={offer.seniority}
                     technologies={offer.technologies}
                     updatedAt={offer.updatedAt}
                  />
                  <span className={styles.offer_date}>3 days ago</span>
               </li>
            ))}
         </ul>
      </div>
   );
};
export default OffersList;
