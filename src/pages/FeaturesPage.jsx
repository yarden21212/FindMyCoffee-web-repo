import React, { useState, useEffect, use } from "react"
import Header from '../components/Header'
import downArrowIcon from '../assets/down-arrow.svg'
import FeatureButton from "../components/FeatureButton"
import axios from "axios"

import getUserCurrPosition from "../Services/GetUserCurrPosition";
import ShopsOutput from "../components/CoffeeShopOutput/ShopsOutput"
import DistanceDropdown from "../components/DistanceDropdown"


const FeaturesPage = () => {
  const [coords, setCoords] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);


  /* Buttons */
  const [isVisible ,setIsVisible] = useState(false);
  const [ratingRange, setRatingRange] = useState('');
  const [shopType, setShopType] = useState('');

  /* Dropdown mode bar*/
  const LABELS = {
    closest: "Closest Coffeeshop",
    distance: "Find By Distance",
    rate: "Find By Rate",
    type: "Find By Type",
    name: "Find By Name",
  };
  const [selectedLabel, setSelectedLabel] = useState("Options");
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState(null); 
  const [option, setOption] = useState("none"); //Tracks which button we pressed, so we can track if we need to make the output visible or invisible
  const choose = (chosenMode) => {
    setMode(chosenMode);   
    setSelectedLabel(LABELS[chosenMode]);
    setIsOpen(false);
  };
  
  /* Used for pulling the distance was chosen from the second dropdown element */
  const [distance, setDistance] = useState("any");
  function chooseDistance(dist) {
    if (dist === distance) return;

    setDistance(dist);
    setIsVisible(false);
    setOutput([]);
    setError("");
    setOption("none");
  }
  
  /* InputBar */
  const [inputBar, setInputBar] = useState(false);
  const [inputBarValue, setInputBarValue] = useState("");
  const [inputBarClicked, setInputBarClicked] = useState(false);


  { /* "Cloest Coffeeshop" - Finds the nearest in distance */ }
  const getClosestShops = async (numOfCoffeeshops, currCoords) => {

    setAmount(0);

    console.log("currCoords param:", currCoords);

    if (!currCoords || (currCoords.latitude === 0 && currCoords.longitude === 0)) {
      setError("Get your location first.");
      return;
    }

    try {
      const response = await axios.post("/api/CoffeeShop/FindClosestCoffeeshops", {
      userLat: currCoords.latitude,
      userLng: currCoords.longitude,
      amount: numOfCoffeeshops,
      }, {
        timeout: 10000, // Stop waiting after 10 seconds.
      });

      setSuccess("Connected to the database");
      setOutput(response.data);
    } catch (e) {
      const msg = e.code === "ECONNABORTED"
        ? "The search took too long. Please try again."
        : "Could not load coffee shops. Please try again.";
      setError(msg);

    }

  };

  { /* "Find By Type" - Finds at most the 9 closest coffeeshop by Type */ }
  const getShopsByType = async (type) => {
    if (isLoading) return;

    setError("");
    setOutput([]);
    setIsLoading(true);
    setAmount(0);
    setShopType(type);

    try {
      let currCoords;

      try {
        currCoords = coords ?? await getUserCurrPosition();
        setCoords(currCoords);
      } catch {
        setError("Could not get your location. Please try again.");
        return;
      }

      const response = await axios.post(
        "/api/CoffeeShop/GetShopsByType",
        {
          Type: type,
          userLat: currCoords.latitude,
          userLng: currCoords.longitude,
          DistanceRanage: distance,
        },
        {
          timeout: 10000, // Stop waiting after 10 seconds.
        }
      );

      setAmount(10);
      setOutput(response.data);
    } catch (e) {
      setError(
        e.code === "ECONNABORTED"
          ? "The search took too long. Please try again."
          : "Could not load coffee shops. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  { /* "Find By Rate" - Finds at most the 9 closest coffeeshop by Rate */ }
  const getShopsByRating = async (ratingMin, ratingMax) => {
    if (isLoading) return;

    setError("");
    setOutput([]);
    setIsLoading(true);
    setAmount(0);
    setRatingRange(`${ratingMin},${ratingMax}`);

    try {
      let currCoords;

      try {
        currCoords = coords ?? await getUserCurrPosition();
        setCoords(currCoords);
      } catch {
        setError("Could not get your location. Please try again.");
        return;
      }

      const response = await axios.post(
        "/api/CoffeeShop/FindByRating",
        {
          MinRating: ratingMin,
          MaxRating: ratingMax,
          userLat: currCoords.latitude,
          userLng: currCoords.longitude,
          DistanceRanage: distance,
        },
        {
          timeout: 10000, // Stop waiting after 10 seconds.
        }
      );

      setAmount(10);
      setOutput(response.data);
    } catch (e) {
      setError(
        e.code === "ECONNABORTED"
          ? "The search took too long. Please try again."
          : "Could not load coffee shops. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  { /* "Find By Name" - Finds at most the 9 closest coffeeshop by given name */ }
  const getShopsByName = async (name) => {
    if (isLoading) return;

    const searchName = name.trim();

    if (!searchName) {
      setError("Please enter a coffee shop name.");
      return;
    }

    setError("");
    setOutput([]);
    setIsLoading(true);
    setAmount(0);

    try {
      let currCoords;

      try {
        currCoords = await getUserCurrPosition();
        setCoords(currCoords);
      } catch {
        setError("Could not get your location. Please try again.");
        return;
      }

      const response = await axios.post(
        "/api/CoffeeShop/GetShopsByName",
        {
          Name: searchName,
          UserLat: currCoords.latitude,
          userLng: currCoords.longitude,
        },
        {
          timeout: 10000, // Stop waiting after 10 seconds.
        }
      );

      setOutput(response.data);
    } catch (e) {
      setError(
        e.code === "ECONNABORTED"
          ? "The search took too long. Please try again."
          : "Could not load coffee shops. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const popInputBar = (boolValue) => {
    setInputBar(boolValue);
  };



  /*------------------------------------------------------ Rate mode functions ------------------------------------------------------ */

  /* Check if the same rate-button was pressed before, if yes, then return yes -> will erase the screen's output (makes the app's use more logically) */
  const checkVisibility = (mode, minRate, maxRate, type) => {
    if(mode === "type"){
        if(isVisible && shopType === `${type}`){ /* For example: the state value 'rate:1-2' will be checked */
        return true;
      }
      else{
        return false;
      }
    }
    if(mode === "rate"){
      if(isVisible && option === `rate:${minRate}-${maxRate}`){ /* For example: the state value 'rate:1-2' will be checked */
        return true;
      }
      else{
        console.log("Hereeeeeee1");
        return false;
      }
    }
    else if(mode === 'distance' || mode === 'closest' || mode === 'name'){
      if( (isVisible && option === 'distance') || (isVisible && option === 'closest') || (isVisible && option === 'name') ) /* The logic is similar for those options */
        return true;
      else
        return false;
    }
  };
  
  /* Display the output of this given rate-mode\rate-button */
  const DisplayOutput = (mode, type, minRate, maxRate) => {
    switch(mode){

      case "type":
        setIsVisible(true);
        setMode(mode);
        getShopsByType(type);
        setShopType(type);
        setOption("type")
        break;

      case "rate":
        console.log(`minRate: ${minRate}, maxRate: ${maxRate}`)
        setIsVisible(true);
        setMode(mode);
        getShopsByRating(minRate, maxRate);
        setOption(`${mode}:${minRate}-${maxRate}`); /* For example: Store the value\option 'rate:1-2' */
        break;

      case "name":
      case "closest": 
      case "distance":
        setIsVisible(true);
        setMode(mode);
        setOption(mode);
        break;
    }  
  }

  /* Erase the current output from the screen (user pressed the same rate-button)  */
  const EraseRateOutput = () => {
    console.log("Hereeeeeee3");
    setIsVisible(false);
    setCoords(null);
    setOption('none');
    setOutput('');
  }

    return (

    <div id='top-layer' className='border-y-indigo-100 min-h-screen bg-amber-100' >

      <div className='bg-zinc-200  shadow-2xl'>
        <Header />
      </div>
      

      <div className='mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10'>
        <div 
          id="upper-label"
          className='bg-amber-700/40 w-full grid grid-cols-1 lg:grid-cols-10 items-center gap-6 p-4
                        border-double border-6 border-black rounded-2xl  
                        shadow-lg shadow-gray-400 box mb-6'>

          
          <div id='left-input-side' className =  'min-w-0 lg:col-span-7 flex items-center justify-center'>
            
            <div className="h-full w-full flex items-center">

            {
              selectedLabel === "Find By Type" ? (
                <div className="flex w-full flex-wrap justify-center gap-4">
                  <FeatureButton
                   name="Italian" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type", "", "", "Italian");

                    currTypeAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("type", "Italian");
                   }} 
                  />
                  <FeatureButton name="French" onClick={ () => {
                    var currTypeAlreadyDisplayed = checkVisibility("type", "", "", "French");

                    currTypeAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("type", "French");
                  }} />
                  <FeatureButton name="Cats" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type", "", "", "Cats");

                    currTypeAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("type", "Cats");
                  }} />
                  <FeatureButton name="Classic" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type", "", "", "Classic");

                    currTypeAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("type", "Classic");
                  }} />
                  <FeatureButton name="Truck" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type", "", "", "Truck");

                    currTypeAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("type", "Truck");
                  }}/>
                  <FeatureButton name="Bakery" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type", "", "", "Bakery");

                    currTypeAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("type", "Bakery");
                  }}/>
                  <FeatureButton name="Theme" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type", "", "", "Theme");

                    currTypeAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("type", "Theme");
                  }}/>
                  <FeatureButton name="Pub" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type", "", "", "Pub");

                    currTypeAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("type", "Pub");
                  }}/>     
                  <FeatureButton name="Espresso Bar" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type", "", "", "Espresso Bar");

                    currTypeAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("type", "Espresso Bar");
                  }}/>               
                </div>
              ) 
              :selectedLabel === "Find By Rate" ? (
                <div 
                  className="flex w-full flex-wrap justify-center gap-x-6 gap-y-4">
                  <FeatureButton name="0 - 1" onClick={() => {
                    var CurrRateAlreadyDisplayed = checkVisibility("rate", 0, 1);
                    console.log(CurrRateAlreadyDisplayed);

                    CurrRateAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("rate", "", 0, 1);
                  }} />
                  <FeatureButton  name="1 - 2" onClick={() => {
                    // IsVisible(1, 2);
                    var CurrRateAlreadyDisplayed = checkVisibility("rate", 1, 2);

                    CurrRateAlreadyDisplayed ? EraseRateOutput(): DisplayOutput("rate", "", 1, 2); 
                  }}/>
                  <FeatureButton name="2 - 3" onClick={() => {
                    var CurrRateAlreadyDisplayed = checkVisibility("rate", 2, 3);

                    CurrRateAlreadyDisplayed ? EraseRateOutput(): DisplayOutput("rate","", 2, 3); 
                  }} />
                  <FeatureButton name="3 - 4" onClick={() => {
                    var CurrRateAlreadyDisplayed = checkVisibility("rate", 3, 4);

                    CurrRateAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("rate","", 3, 4);
                  }} />
                  <FeatureButton name="4 - 4.5" onClick={() => {
                    var CurrRateAlreadyDisplayed = checkVisibility("rate", 4, 4.5);
                    console.log(CurrRateAlreadyDisplayed);

                    CurrRateAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("rate","", 4, 4.5);
                  }} />               
                  <FeatureButton name="4.5 - 5" onClick={() => {
                    var CurrRateAlreadyDisplayed = checkVisibility("rate", 4.5,5);
                    
                    CurrRateAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("rate", "", 4.5,5);
                  }}/>
              </div>
              )
              :selectedLabel === "Find By Name" ? (
                <div className="grid w-full min-w-0 gap-3 place-items-center">

                  <input
                    id='input-bar'
                    placeholder='Enter a name' 
                    className={
                      (inputBar ? 'px-4 py-2 w-full min-w-0 border-3 border-amber-900 shadow-lg shadow-black/50 rounded-2xl focus:ring-3 ring-white  hover:bg-amber-300': 'hidden')}

                    //Controlling an input with a state variable 
                    value = {inputBarValue}
                    onChange={e => setInputBarValue(e.target.value)}
                    >
                  </input>

                  <button
                    className="bg-amber-900 text-white py-1 h-full w-20 border-3 border-black shadow-lg shadow-black/50 rounded-2xl cursor-pointer hover:bg-amber-300 active:bg-amber-400"
                    value = {inputBarClicked}
                    onClick={async () => {

                    if (isLoading) return;

                    DisplayOutput("name");
                    await getShopsByName(inputBarValue);
                  }}
                  >Search
                  </button>
                
                </div>
              )
              :selectedLabel === "Closest Coffeeshop" ? (
                <div className="w-full h-full flex items-center justify-center"> 
                  <div
                    
                    onClick={async () => {

                      if (isLoading) return;

                      setError("");
                      setOutput([]);
                      setIsLoading(true);
                      DisplayOutput("closest");

                      try {
                        const c = coords ?? await getUserCurrPosition();
                        setCoords(c);
                        setAmount(1);
                        await getClosestShops(1, c);
                      }
                      catch {
                        setError("Could not get your location. Please try again.");
                      }
                      finally {
                        setIsLoading(false);
                      }
                    }
                  }
                    
                    className="bg-amber-800/30 w-19 h-19 shadow-lg shadow-gray-600/60 border-dotted border-3 border-white rounded-full  flex items-center justify-center
                                  mb-3 cursor-pointer hover:bg-amber-600/40 active:bg-amber-500/20 select-none">
                    <p 
                      className="text-[13px] font-bold text-white animate-pulse"
                      >Just Click!
                    </p>
                  </div>
                </div>
              )
              :selectedLabel === "Find By Distance" ? (
                <div className="w-full h-full flex items-center justify-center"> 
                  <div
                    
                    onClick={async () => {

                      if (isLoading) return;

                      setError("");
                      setOutput([]);
                      setIsLoading(true);
                      DisplayOutput("distance");

                      try {
                        const c = coords ?? await getUserCurrPosition();
                        setCoords(c);
                        setAmount(9);
                        await getClosestShops(9, c);
                      }
                      catch {
                        setError("Could not get your location. Please try again.");
                      }
                      finally {
                        setIsLoading(false);
                      }
                    }
                  }
                    
                    className="bg-amber-800/30 w-19 h-19 shadow-lg shadow-gray-600/60 border-dotted border-3 border-white rounded-full  flex items-center justify-center
                                  mb-3 cursor-pointer hover:bg-amber-600/40 active:bg-amber-500/20 select-none">
                    <p 
                      className="text-[13px] font-bold text-white animate-pulse"
                      >Just Click!
                    </p>
                  </div>

                </div>
              )
              :null
            }              
            </div>

           
          </div>

          <div id='dropDownButton' className='w-full min-w-0 border-t-2 pt-4 lg:border-t-0 lg:border-l-2 lg:pt-0 lg:pl-4 lg:col-span-3 grid items-center justify-items-center gap-3'>


            <div
              id="options-pointer-image-label" 
              className='border-2 border-gray-300 w-full max-w-64 px-2 py-1 rounded font-bold cursor-pointer flex justify-between relative bg-white shadow-sm select-none '
              onClick={toggleDropdown}
            >
              <div 
                id="options"
                className='text-[14px]'
                >{selectedLabel}
              </div>


              <div
                id="pointer-image" 
                className='flex items-center justify-center'
              >
                <img src={downArrowIcon} className='w-3 ml-1'/>
              </div>
              

              {/* Dropdown menu for the different features a use can serach by */}
              {isOpen && (
                <div 
                  className="inline- border border-gray-200 rounded-md bg-white absolute top-full left-0 z-40 mt-2 w-full whitespace-nowrap shadow-md"
                >
                 
                  <div className="cursor-pointer hover:bg-red-200 px-3 py-3" onClick={() => {choose("type"); popInputBar(false); setIsVisible(false)} }>Find By Type</div>
                  <div className="cursor-pointer hover:bg-red-200 px-3 py-3" onClick={() => {choose("name"); popInputBar(true); setIsVisible(false);} }>Find By Name</div>
                  <div className="cursor-pointer hover:bg-red-200 px-3 py-3" onClick={() => {choose("rate"); popInputBar(false); setIsVisible(false)}}>Find By Rate</div>
                  <div className="cursor-pointer hover:bg-red-200 px-3 py-3" onClick={() => {choose("closest"); popInputBar(false); setIsVisible(false)}}>Closest Coffeeshop</div>
                  <div className="cursor-pointer hover:bg-red-200 px-3 py-3" onClick={() => {choose("distance"); popInputBar(false); setIsVisible(false)}}>Find By Distance</div>
                </div>
              )}

            </div>

              {
                /*
                * If the chosen mode is "Find By Type" or "Find By Rate", then a second dropdown component will show up under the first one 
                */
                (selectedLabel === "Find By Type" || selectedLabel === 'Find By Rate') && <div className="w-full max-w-64"><DistanceDropdown chooseDistance={chooseDistance}/></div>
              } 

          </div>
          
        </div>

        
        <div>

              
          {mode === "distance" ? (
            <div id="output-label" className={isVisible ? "" : "hidden"}>
              {isLoading ? (
                <p role="status">Finding nearby coffee shops...</p>
              ) : error ? (
                <p role="alert">{error}</p>
              ) : (
                <ShopsOutput mode={mode} output={output} />
              )}
            </div>
          ):mode === "type" ? (
            <div id="type-label" className={isVisible ? "" : "hidden"}>
              {isLoading ? (
                <p role="status">Finding nearby coffee shops...</p>
              ) : error ? (
                <p role="alert">{error}</p>
              ) : (
                <ShopsOutput mode={mode} output={output} />
              )}
            </div>
          )
           : mode === "rate" ? (
            <div id="rating-label" className={isVisible ? "" : "hidden"}>
              {isLoading ? (
                <p role="status">Finding nearby coffee shops...</p>
              ) : error ? (
                <p role="alert">{error}</p>
              ) : (
                <ShopsOutput mode={mode} output={output} />
              )}
            </div>
          ) : mode === "closest" ? (
            <div id="closest-label" className={isVisible ? "" : "hidden"}>
              {isLoading ? (
                <p role="status">Finding nearby coffee shops...</p>
              ) : error ? (
                <p role="alert">{error}</p>
              ) : (
                <ShopsOutput mode={mode} output={output} />
              )}
            </div>
          ) 
          : mode === "name" ? (
            <div id="name-label" className={isVisible ? "" : "hidden"}>
              {isLoading ? (
                <p role="status">Finding nearby coffee shops...</p>
              ) : error ? (
                <p role="alert" className="mx-auto w-fit max-w-full rounded-2xl border-3 border-black bg-amber-900 px-4 py-2 text-center text-white shadow-md lg:px-8 lg:py-4 lg:text-xl">{error}</p>
              ) : (
                <ShopsOutput mode={mode} output={output} />
              )}
            </div>
          )
          : null}
        </div>

      </div>
    </div>
  )
}

export default FeaturesPage
