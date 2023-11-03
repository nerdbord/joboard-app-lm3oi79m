import React, { MouseEventHandler, useContext } from 'react';
import styles from './OffersList.module.scss';
import Offer from '../Offer/Offer';
import { OfferData } from '../../interfaces/OfferData';
import { DataContext } from '../../context/DataContext';
import { ModalContext } from '../../context/ModalContext';

interface OffersListProps {
   offers: OfferData[];
}

const OffersList: React.FC<OffersListProps> = ({ offers }) => {
   const { setSelectedOfferId } = useContext(DataContext);
   const { setIsModalOpen } = useContext(ModalContext);

   const openModal: MouseEventHandler<HTMLLIElement> = (event) => {
      const clickedOfferId = event.currentTarget.getAttribute('data-offer-id');
      if (clickedOfferId) {
         setSelectedOfferId(clickedOfferId);
         setIsModalOpen(true);
      }
   };
   if (!offers) {
      return null;
   }
   return (
      <>
         <div className={styles.container}>
            <ul className={styles.list}>
               {offers.map((offer) => (
                  <li
                     key={offer._id}
                     onClick={openModal}
                     className={styles.list_element}
                     data-offer-id={offer._id}
                  >
                     <Offer
                        _id={offer._id}
                        title={offer.title}
                        city={offer.city}
                        image={offer.image}
                        companyName={offer.companyName}
                        createdAt={offer.createdAt}
                        currency={offer.currency}
                        description={offer.description}
                        jobType={offer.jobType}
                        offerUrl={offer.offerUrl}
                        salaryFrom={offer.salaryFrom}
                        salaryTo={offer.salaryTo}
                        workLocation={offer.workLocation}
                        seniority={offer.seniority}
                        technologies={offer.technologies}
                        updatedAt={offer.updatedAt}
                        country={offer.country}
                     />
                     <span className={styles.offer_date}>3 days ago</span>
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
};
export default OffersList;
