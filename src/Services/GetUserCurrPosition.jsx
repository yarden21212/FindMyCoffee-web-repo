export default function getUserCurrPosition(){
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        const {latitude, longitude} = coords;
        resolve({latitude, longitude});
      },
      (error) => reject(error)
    );
  });
}










// export default function getUserCurrPosition(setCoords){
//   navigator.geolocation.getCurrentPosition(
//     ({ coords }) => {
//       const { latitude, longitude } = coords;
//       setCoords({latitude, longitude});
//       console.log(latitude, longitude)
//     },
//     (error) => {
//       console.error("Error getting position:", error);
//     }
//   );
// };