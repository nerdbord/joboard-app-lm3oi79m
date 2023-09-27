const API_BASE_URL = 'https://training.nerdbord.io/api/v1/joboard/offers';
export const getJobOffers = async (params?: any): Promise<any> => {
   const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   });
   if (!response.ok) {
      throw new Error('Problem with fetching job offers');
   }
   const data = await response.json();
   return data;
};
