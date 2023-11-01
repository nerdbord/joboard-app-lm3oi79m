import * as styles from './OfferDetailsModal.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import closeIcon from '@images/Close.svg';
import { useQuery } from 'react-query';
import { getJobOfferById } from '../../services/offersApi';
import { DataContext } from '../../context/DataContext';
import { OfferData } from '../../interfaces/OfferData';
interface OfferDetailModalProps {
   id: string;
}

const OfferDetailsModal: React.FC<{ id: string }> = ({ id }) => {
   function countDaysAgo(createdAt: string): number {
      const createdAtDate = new Date(createdAt);
      const current = new Date();
      const timeDifference = current.getTime() - createdAtDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return daysDifference;
   }
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
                        <img
                           className={styles.company_logo}
                           src={offerData.image}
                           alt="image of offer"
                        />
                        <div className={styles.title_wrapper}>
                           <span className={styles.title}>{offerData.title}</span>
                           <p className={styles.technologies}>
                              {offerData.technologies.join('・').toUpperCase()}
                           </p>
                        </div>
                     </div>
                     <div className={styles.description_area}>
                        <div className={styles.left_area}>
                           <span className={styles.description_title}>{offerData.title}</span>
                           <p className={styles.description_text}>{offerData.description}</p>
                        </div>
                        <div className={styles.left_wrapper}>
                           <div className={styles.button_wrapper}>
                              <a href={offerData.offerUrl}>
                                 <button className={styles.offer_button}>Visit offer ➔</button>
                              </a>
                           </div>

                           <div className={styles.right_area}>
                              <div className={styles.description_item}>
                                 <span className={styles.list_element_header}>Added</span>
                                 <p className={styles.data_item}>
                                    {countDaysAgo(offerData.createdAt)} days ago
                                 </p>
                              </div>
                              <div className={styles.line}></div>
                              <div className={styles.description_item}>
                                 <span className={styles.list_element_header}>Company</span>
                                 <p className={styles.data_item}>{offerData.companyName}</p>
                              </div>
                              <div className={styles.line}></div>
                              <div className={styles.description_item}>
                                 <span className={styles.list_element_header}>Seniority</span>
                                 <p className={styles.data_item}>{offerData.seniority}</p>
                              </div>
                              <div className={styles.line}></div>
                              <div className={styles.description_item}>
                                 <span className={styles.list_element_header}>Location</span>
                                 <p className={styles.data_item}>{offerData.country}</p>
                              </div>
                              <div className={styles.line}></div>
                              <div className={styles.description_item}>
                                 <span className={styles.list_element_header}>Job Type</span>
                                 <p className={styles.data_item}>{offerData.jobType}</p>
                              </div>
                              <div className={styles.line}></div>
                              <div className={styles.description_item}>
                                 <span className={styles.list_element_header}> Contract </span>
                                 <p className={styles.data_item}>{offerData.workLocation}</p>
                              </div>
                              <div className={styles.line}></div>
                              <div className={styles.description_item}>
                                 <span className={styles.list_element_header}>Salary</span>
                                 <p className={styles.data_item}>
                                    {offerData.salaryFrom}-{offerData.salaryTo}
                                    {offerData.currency}
                                 </p>
                              </div>
                           </div>
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
