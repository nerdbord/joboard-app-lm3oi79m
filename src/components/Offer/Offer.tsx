import React, { useContext } from 'react';
import styles from './Offer.module.scss'; // Import the SCSS module
import { OfferProps } from '../../interfaces/OfferProps';
import { OfferData } from '../../interfaces/OfferData';
import { ModalContext } from '../../context/ModalContext';

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
   image,
}) => {
   const { openModal } = useContext(ModalContext);
   const openModalHandler = () => {
      openModal(_id);
   };
   return (
      <div onClick={openModalHandler} className={styles.job_title_wrapper}>
         <img className={styles.company_logo_desktop} src={image} alt="company logo" />
         <div className={styles.test}>
            <span className={styles.job_title}>{title}</span>
            <div className={styles.info_wrapper}>
               <img className={styles.company_logo_mobile} src={image} alt="company logo" />
               <div className={styles.mobile_wrapper}>
                  <div className={styles.box}>
                     <p className={styles.company_name}>{companyName}</p>
                     <div className={styles.line}></div>
                     <p className={styles.single_info}>{city}</p>
                  </div>
                  <div className={styles.box}>
                     <p className={styles.single_info} data-testid={`datatest-${jobType}`}>
                        {jobType}
                     </p>
                     <div className={styles.line}></div>
                     <p className={styles.single_info}>{seniority}</p>
                  </div>
               </div>

               <p className={styles.salary}>
                  {salaryFrom} - {salaryTo} net
               </p>
            </div>
         </div>
      </div>
   );
};
export default Offer;
