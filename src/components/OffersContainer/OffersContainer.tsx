import React, { useEffect, useState } from 'react';
import styles from './OffersContainer.module.scss';
import OffersList from '../OffersList/OffersList';
import { Search } from '../Search/Search';
import { useQuery, useQueryClient } from 'react-query';
import { getJobOffers } from '../../services/offersApi';
import SearchBar from '../SearchBar/SearchBar';
import { OfferData } from '../../interfaces/OfferData';

const OffersContainer = () => {
   let { data, error, isLoading } = useQuery('jobOffers', getJobOffers);
   const [locations, setLocations] = useState<string[]>([]);
   const [value, setValue] = useState('');
   const queryClient = useQueryClient();

   const onChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
   };

   useEffect(() => {
      if (data) {
         const cities = data.map((item: OfferData) => item.city);
         const notDuplicateCities = [...new Set(cities)];
         setLocations(notDuplicateCities as string[]);
      }
   }, [data]);

   const [filteredOffers, setFilteredOffers] = useState<OfferData[]>([]);

   useEffect(() => {
      const filterData = () => {
         if (!data) return [];

         if (value) {
            const filteredData = data.filter((offer: OfferData) =>
               offer.city.toLowerCase().startsWith(value.toLowerCase()),
            );
            setFilteredOffers(filteredData);
         } else {
            setFilteredOffers(data);
         }
      };

      filterData();
   }, [data, value]);

   const getOfferUI = () => {
      if (isLoading) {
         return <div>Loading...</div>;
      }
      if (error) {
         return <div>Error</div>;
      }
      if (data) {
         return (
            <div className={styles.container}>
               <SearchBar
                  value={value}
                  setValue={setValue}
                  onChange={onChangeLocation}
                  locations={locations}
               />
               <span className={styles.offers_counter}>{filteredOffers.length} offers found</span>

               {filteredOffers.length != 0 ? (
                  <OffersList offers={filteredOffers} />
               ) : (
                  <div>No results found</div>
               )}
            </div>
         );
      }
   };

   return (
      <div className={styles.offers_container}>
         <Search />
         {getOfferUI()}
      </div>
   );
};

export default OffersContainer;
