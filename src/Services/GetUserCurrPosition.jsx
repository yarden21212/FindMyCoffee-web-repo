export default function getUserCurrPosition(){
  return new Promise((resolve, reject) => {
    
    if(!navigator.geolocation){
      return reject(new Error("Geolocation is not supported by this browser."));
    }
    else{
      navigator.geolocation.getCurrentPosition(
      // 1. SUCCESS CALLBACK: Runs when the position is successfully retrieved
      (position) => {
        const { latitude, longitude } = position.coords;
        // Fulfills the Promise, passing the data as the resolved value.
        resolve({ latitude, longitude });
      },
      
      // 2. ERROR CALLBACK: Runs when the request fails (e.g., user denies permission)
      (error) => {
        // Rejects the Promise, passing the error object as the rejection reason.
        reject(error);
      }),
       {
        enableHighAccuracy: true,
        timeout: 5000, // 5 seconds
        maximumAge: 0 // Do not use a cached position
      }
    }
  });
}