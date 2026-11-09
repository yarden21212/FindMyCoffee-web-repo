import React, { useState } from 'react'
import axios from 'axios'
import HorizontalDropDownButton from '../HorizontalDropDownButton'
import useRatingSound from '../../hooks/useRatingSound'


/*
  Decide how many shops to show, based on:
   - the current mode (closest/distance/rate/type/name) and how many shops have passed (amount).
*/
const grid = (mode, amount) => {
  if (mode === 'closest' || mode === 'distance' || mode === 'rate' || mode === 'type' || mode === 'name') {
    if (amount <= 1) return 'grid grid-cols-1 gap-4 mt-4'
    if (amount == 2) return 'grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'
    if (amount >= 3) return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'
  }
  else return "hidden"
}

/*
  Purpose:
  Show the list of shops (output) in a grid.
  Extra feature: only for mode === 'name':
  Let the user rate a shop (choose 1-5 and send POST request).
*/
const ShopsOutput = ({ mode, output }) => {
  const { prepareRatingSound, playRatingSound } = useRatingSound();

  /* 
    We want to rate a shop only when mode === 'name'
    The user chooses a number from 1..5 and then clicks "Rate me!"
  */
  // The available rating options we show as buttons
  const rates = [1, 2, 3, 4, 5]

  /* Dropdown button attributes (PER SHOP) */
  const [rateDropDownVisible, setRateDropDownVisible] = useState({}) // shopId -> bool

/*
    rate
    ----
    This is an OBJECT that stores the selected rate per shop.
    Example:
      rate = {
        6: 3,   // shopId 6 selected 3
        9: 5    // shopId 9 selected 5
      }

    ratePressed
    -----------
    This is an OBJECT that stores if the user picked a rate per shop.
    We use it to decide whether to display the "chosen rate bubble".
    Example:
      ratePressed = {
        6: true,  // user selected a rate for shop 6
        9: false  // user did not select yet for shop 9
      }
  */
  const [rate, setRate] = useState({})               // shopId -> chosen rate
  const [ratePressed, setRatePressed] = useState({}) // shopId -> bool

  // Rating messages belong to each shop, not the whole list.
  const [ratingFeedback, setRatingFeedback] = useState({});

    /*
    This opens/closes the horizontal rating buttons for THIS shop.

    - prev is the old object state
    - {...prev} copies everything so we don't lose other shops' values
    - [shopId]: ... updates only the current shop entry
  */
  const toggleRateDropDownVisible = (shopId) => {
    setRateDropDownVisible(prev => ({ ...prev, [shopId]: !prev[shopId] }))
  }

    /*
    This runs when the user clicks a rating number inside HorizontalDropDownButton.

    What it does:
    1) Save the chosen rate number for this shopId
    2) Mark that this shop has "ratePressed = true" so we can display it in UI
  */
  const handleChildDataForRate = (shopId, data) => {
    // Save selected rate for this shop
    setRate(prev => ({ ...prev, [shopId]: data }))
    // Mark that user already chose a rate for this shop (for UI display)
    setRatePressed(prev => ({ ...prev, [shopId]: true }))
  }

  /*
    Steps:
    1) Stop default form refresh (e.preventDefault)
    2) Validate that the user selected a rate
    3) Send POST request to backend
    4) On success: reset UI for THIS shop + show success message
    5) On failure: show error message
  */
  const handleSubmitRate = async (e, shopId) => {
    e.preventDefault();

    if (rate[shopId] == null || rate[shopId] === '') {
      setRatingFeedback(prev => ({
        ...prev,
        [shopId]: { type: 'error', text: 'Please choose a rate first!' },
      }));
      return;
    }

    prepareRatingSound();
    setRatingFeedback(prev => ({ ...prev, [shopId]: null }));

    try {
      await axios.post(
        "/api/CoffeeShop/Rate",
        {
          Id: shopId,
          UserRate: rate[shopId],
        },
        {
          timeout: 10000, // Stop waiting after 10 seconds.
        }
      );

      setRate(prev => ({ ...prev, [shopId]: '' }));
      setRatePressed(prev => ({ ...prev, [shopId]: false }));
      setRateDropDownVisible(prev => ({ ...prev, [shopId]: false }));
      setRatingFeedback(prev => ({
        ...prev,
        [shopId]: { type: 'success', text: 'Rating submitted!' },
      }));
      void playRatingSound();
    } catch (err) {
      console.log("Http POST failed: the error is: " + err);
      setRatingFeedback(prev => ({
        ...prev,
        [shopId]: {
          type: 'error',
          text: err.code === "ECONNABORTED"
            ? "No confirmation received. Refresh to check your rating."
            : "Rating failed. Try again.",
        },
      }));
    }
  };

  if (!output) return "loading..."
  if (output.length === 0) return <p>No results</p>

  const gridClass = grid(mode, output.length)

  return (
    
    <div
      className={`mx-auto w-full max-w-6xl ${gridClass}`}
    >
      {output.map((shop) => (
        <div key={shop.id} className="min-w-0 break-words bg-amber-700/80 rounded-2xl p-3 text-white">
          <p>Name: <strong>{shop.businessName}</strong></p>
          <p>Vicinity: <strong>{shop.vicinity}</strong></p>
          <p>Rating: <strong>{shop.rating}⭐ ({shop.totalUserRating})</strong></p>
          <p>PriceLevel: <strong>{shop.priceLevel}</strong></p>
          <p>Distance: <strong>{shop.distanceKm}km</strong></p>
          <p>Address: <strong>{shop.country}, {shop.city}, {shop.street}</strong></p>

          {/* Rate section (identical pattern to my type and priceLevel selectors in CreateCoffeeShopPage)*/}
          {mode === 'name' && (
            <div className='mt-5'>

              {/* Toggle section */}
              <button
                type="button"
                aria-expanded={!!rateDropDownVisible[shop.id]}
                onClick={() => toggleRateDropDownVisible(shop.id)}
                className="mb-3 rounded-xl border-2 border-amber-950 bg-amber-100 px-4 py-2 font-bold text-amber-950 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Choose your rating
              </button>

              {/* Shows chosen rate only after pressed */}
              <div className='flex items-center justify-center ml-2 w-20 bg-transparent animate-pulse'>
                {ratePressed[shop.id] && (
                  <div className='text-amber-100 font-bold border-amber-200 border-2 rounded-full p-2'>
                    {rate[shop.id]}
                  </div>
                )}
              </div>

              {/* Horizontal buttons */}
              <div className='grid grid-cols-2 justify-items-center place-items-center mt-2'>
                <div className='flex items-center justify-center text-white'>
                  {rateDropDownVisible[shop.id] && (
                    <HorizontalDropDownButton
                      options={rates}
                      handleChildData={(data) => handleChildDataForRate(shop.id, data)}
                      groupNumber={shop.id} // IMPORTANT: unique per shop; do NOT hardcode 1
                    />
                  )}
                </div>
              </div>

              {/* Submit */}
              <form onSubmit={(e) => handleSubmitRate(e, shop.id)} noValidate className='mt-12'>
                <button className='bg-red-500 border-3 border-black rounded-2xl p-2 cursor-pointer hover:bg-red-600 active:text-black'>
                  Rate me!
                </button>
              </form>

              {/* Feedback for this shop only */}
              {ratingFeedback[shop.id] && (
                <p
                  role={ratingFeedback[shop.id].type === 'error' ? 'alert' : 'status'}
                  className={`mt-4 w-full rounded-md border-2 px-3 py-2 text-sm font-bold ${
                    ratingFeedback[shop.id].type === 'error'
                      ? 'border-red-800 bg-red-100 text-red-950'
                      : 'border-green-800 bg-green-100 text-green-950'
                  }`}
                >
                  {ratingFeedback[shop.id].text}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ShopsOutput





// import React from 'react'
// // import SpinnerLoader from "../components/SpinnerLoader";

// /* JSX variables */

// const grid = (mode, amount) => {
//   if(mode === 'closest' || mode === 'distance' || mode === 'rate' || mode === 'type' || mode === 'name'){
//     if(amount <= 1) return 'grid grid-cols-1 gap-4 mt-4';
//     if(amount == 2) return 'grid grid-cols-2 gap-4 mt-4'
//     if(amount >= 3) return 'grid grid-cols-3 gap-4 mt-4'
//   }
//   else return "hidden";
// }

// const ShopsOutput = ({ mode, output}) => {

//   while(!output){
//     return "loading...";
//   }
  
//   if (output.length === 0) return <p>No results</p>;
  
//   else{
//     const gridClass = grid(mode, output.length);

//     return (
//       <div 
//         className={`mx-auto w-full max-w-6xl ${gridClass}`}
//         // style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
//       >
//         {output.map((shop, /* i */) => (
//           <div key={shop.id} className="min-w-0 break-words bg-amber-700/80 rounded-2xl p-3 text-white">
//             <p>Name: <strong>{shop.businessName}</strong></p>
//             <p>Vicinity: <strong>{shop.vicinity}</strong></p>
//             <p>Rating: <strong>{shop.rating}⭐</strong></p>
//             {/* <p>Title: <strong>{shop.title}</strong></p> */}
//             <p>PriceLevel: <strong>{shop.priceLevel}</strong></p>
//             <p>Distance: <strong>{shop.distanceKm}km</strong></p>
//             <p>Address: <strong>{shop.state}, {shop.city}</strong></p>
//           </div>
//         ))}
//       </div>
//     );
//   }
  
// };

// export default ShopsOutput
