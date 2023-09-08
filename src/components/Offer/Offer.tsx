import React from 'react';
import styles from './Offer.module.scss'; // Import the SCSS module
import { OfferProps } from '../../interfaces/OfferProps';
import { OfferData } from '../../interfaces/OfferData';

const Offer: React.FC<OfferData> = ({
   _id,
   title,
   city,
   companyName,
   createdAt,
   currency,
   description,
   jobType,
   offerUrl,
   salaryFrom,
   salaryTo,
   seniority,
   technologies,
   updatedAt,
}) => {
   return (
      <div className={styles.job_title_wrapper}>
         <img className={styles.company_logo} src={offerUrl} alt="company logo" />
         <div className={styles.test}>
            <span className={styles.job_title}>{title}</span>
            <div className={styles.info_wrapper}>
               <p className={styles.company_name}>{companyName}</p>
               <p className={styles.single_info}>{city}</p>
               <p className={styles.single_info}>{jobType}</p>
               <p className={styles.single_info}>{seniority}</p>
               <p className={styles.salary}>
                  {salaryFrom} - {salaryTo} net
               </p>
            </div>
         </div>
      </div>
   );
};
export default Offer;
