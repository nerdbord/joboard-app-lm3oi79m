function countDaysAgo(createdAt: string): number {
   const createdAtDate = new Date(createdAt);
   const current = new Date();
   const timeDifference = current.getTime() - createdAtDate.getTime();
   const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
   return daysDifference;
}
export default countDaysAgo;
