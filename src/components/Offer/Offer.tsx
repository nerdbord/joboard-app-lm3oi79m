import React from 'react';
import styles from './Offer.module.scss'; // Import the SCSS module
import { OfferProps } from '../../interfaces/OfferProps';

const Offer: React.FC<OfferProps> = ({
   title,
   companyName,
   companyLogo,
   companyLocation,
   companySeniority,
   companyJobType,
   companySalary,
}) => {
   return (
      <div className={styles.job_title_wrapper}>
         <img className={styles.company_logo} src={companyLogo} alt="company logo" />

         <span className={styles.job_title}>{title}</span>
         <div className={styles.info_wrapper}>
            <p className={styles.company_name}>{companyName}</p>
            <p className={styles.single_info}>{companyLocation}</p>
            <p className={styles.single_info}>{companyJobType}</p>
            <p className={styles.single_info}>{companySeniority}</p>
            <p className={styles.salary}>{companySalary}</p>
         </div>
      </div>
   );
};
export default Offer;
