import React from 'react';
import styles from './OffersList.module.scss';
import Offer from '../Offer/Offer';

interface OfferData {
   _id: string;
   title: string;
   companyName: string;
   companyLocation: string;
   companyJobType: string;
   companySeniority: string;
   companyLogo: string;
   companySalary: string;
}

interface OffersListProps {
   offers: OfferData[];
}

const OffersList: React.FC<OffersListProps> = ({ offers }) => {
   return (
      <div className={styles.container}>
         <ul className={styles.list}>
            {offers.map((offer) => (
               <li key={offer._id} className={styles.list_element}>
                  <Offer
                     title={offer.title}
                     companyName={offer.companyName}
                     companyLocation={offer.companyLocation}
                     companyJobType={offer.companyJobType}
                     companySeniority={offer.companySeniority}
                     companyLogo={offer.companyLogo}
                     companySalary={offer.companySalary}
                  />
                  <span className={styles.offer_date}>3 days ago</span>
               </li>
            ))}
         </ul>
      </div>
   );
};
export default OffersList;
