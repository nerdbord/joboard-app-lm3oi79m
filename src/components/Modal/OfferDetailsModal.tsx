import * as styles from './OfferDetailsModal.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import closeIcon from '@images/Close.svg';
import { useQueries, useQuery } from 'react-query';
import { getJobOfferById } from '../../services/offersApi';
import { DataContext } from '../../context/DataContext';
import { OfferData } from '../../interfaces/OfferData';
interface OfferDetailModalProps {
   id: string;
}

const OfferDetailsModal: React.FC<{ id: string }> = ({ id }) => {
   const { closeModal } = useContext(DataContext);
   const [offerData, setOfferData] = useState<OfferData | null>(null);
   const closeModalHandler = () => {
      closeModal();
   };
   const getJobOffer = async () => {
      const response = await getJobOfferById(id);
      setOfferData(response);
      return response;
   };
   const { error, isLoading } = useQuery(['jobOffer'], getJobOffer);

   const getOfferUI = () => {
      if (isLoading) {
         return <div>Loading...</div>;
      }
      if (error) {
         return <div>Error</div>;
      }
      return (
         <>
            {' '}
            {offerData != null ? (
               <div className={styles.background}>
                  <div className={styles.container}>
                     <button onClick={closeModalHandler} className={styles.button_close}>
                        <img src={closeIcon} className={styles.close_icon} />
                     </button>
                     <div className={styles.headline_area}>
                        <img src={offerData.image} alt="image of offer" />
                        {offerData.technologies.map((technology) => (
                           <div key={technology}>{technology}</div>
                        ))}
                     </div>
                     <div className={styles.description_area}>
                        <div className={styles.left_area}> {offerData.description}</div>
                        <button>
                           {' '}
                           <a href={offerData.offerUrl}></a>Visit offer
                        </button>
                        <div className={styles.right_area}>
                           {' '}
                           {offerData.seniority}
                           {offerData.city}
                           {offerData.country}
                           {offerData.jobType}
                           {offerData.salaryFrom}
                           {offerData.salaryTo}
                        </div>
                     </div>
                  </div>
               </div>
            ) : (
               <div>No results found </div>
            )}
         </>
      );
   };
   return getOfferUI();
};

export default OfferDetailsModal;
