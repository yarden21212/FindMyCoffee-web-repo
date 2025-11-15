import React, { useState, useEffect, use } from "react"
import Header from '../components/Header'
import downArrowIcon from '../assets/down-arrow.svg'
import FeatureButton from "../components/FeatureButton"
import axios from "axios"
import CoffeeShopList from "../components/CoffeeShopOutput/CoffeeShopList"
import getUserCurrPosition from "../Services/GetUserCurrPosition";
import ShopsOutput from "../components/CoffeeShopOutput/ShopsOutput"
import SecondDropdown from "../components/SecondDropdown"




const FeaturesPage = () => {
  const [coords, setCoords] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [output, setOutput] = useState([]);
  const [amount, setAmount] = useState(0);


  /* Buttons */
  // const [justClick, setJustClick] = useState(false);
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
  function chooseDistance(dist){
    setDistance(dist);
  }
  
  /* InputBar */
  const [inputBar, setInputBar] = useState(false);
  const [inputBarValue, setInputBarValue] = useState("");
  const [inputBarClicked, setInputBarClicked] = useState(false);


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
      });

      setSuccess("Connected to the database");
      setOutput(response.data);
    } catch (e) {
      const msg =
        e?.response?.data?.message || e.message || "Didn't manage to connect to the server";
      setError(msg);

    }

  };

  const getShopsByType = async (type) => {
    setOutput("");
    setAmount(0);
    setShopType(type);


    var currCoords;

    try{
      currCoords = await getUserCurrPosition();
      setSuccess("Managed to get the user coords")
    }
    catch(e){
      setError("Error: Failed to get the user's location")
      console.log("Error(getShopsByType): " + e);
    }

    if(!currCoords || (currCoords.latitude === 0 && currCoords.longitude === 0) ){
      setError("Get your location first.");
      return;
    }

    try{
      var response = axios.post("/api/CoffeeShop/GetShopsByType", {
        Type: type,
        userLat: currCoords.latitude,
        userLng: currCoords.longitude,
        DistanceRanage: distance
      
      });
      setAmount(10);
      setSuccess("Connected to the database");
      setOutput((await response).data)

    }catch(e){
      const msg =
        e?.response?.data?.message || e.message || "Didn't manage to connect to the server";
      setError(msg);
    }
  }

  const getShopsByRating = async (ratingMin, ratingMax) => {

    setOutput("");
    setOutput("");
    setAmount(0);
    setRatingRange(`${ratingMin},${ratingMax}`);
    console.log(ratingMin, ratingMax);

    var currCoords;

    try{
      currCoords = await getUserCurrPosition();
      setSuccess("Managed to get the user coords")
    }catch(error){
      setError("Failed to get the user's location")
      console.log("I'm here: " + error);
    }

    if (!currCoords || (currCoords.latitude === 0 && currCoords.longitude === 0)) {
      setError("Get your location first.");
      return;
    }

    console.log(`distance is: ${distance}`);
    try{
      const response = axios.post("/api/CoffeeShop/FindByRating", {
        MinRating: ratingMin,
        MaxRating: ratingMax,
        userLat: currCoords.latitude,
        userLng: currCoords.longitude,
        DistanceRanage: distance
      });
      
      setAmount(10);
      setSuccess("Connected to the database");
      setOutput((await response).data)

      console.log("I'm here!");
    }catch(e){
      const msg =
        e?.response?.data?.message || e.message || "Didn't manage to connect to the server";
      setError(msg);
    }
  }

  const getShopsByName = async(name) => {

    setOutput("");
    setAmount(0);

    var currCoords;

    try{
      currCoords = await getUserCurrPosition();
      
      console.log("Successfuly got the user coords");
    }
    catch(e){
      console.log("Fafiled to get the user's coords!");

      console.log(`Error: ${e}`);
    }

    try{
      var response = await axios.post('/api/CoffeeShop/GetShopsByName', {
      Name: inputBarValue,
      UserLat: currCoords.latitude,
      userLng: currCoords.longitude
    })

      setSuccess("Connected to the database");
      setOutput((await response).data)
    }
    catch(e){
      const msg =
        e?.response?.data?.message || e.message || "Didn't manage to connect to the server";
      setError(msg);
    }
  }

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
      

      <div className='h-screen place-items-center justify-self-center-safe'>
        <div 
          id="upper-label"
          className='bg-amber-700/40 w-220 h-30 grid grid-cols-10 items-center gap-10 pt-2
                        border-double border-6 border-black rounded-2xl  
                        shadow-lg shadow-gray-400 box mt-20'>

          
          <div id='left-input-side' className =  'col-span-7 flex items-center justify-center ml-7'>
            
            <div className="h-full w-full flex items-center">

            {
              selectedLabel === "Find By Type" ? (
                <div className="ml-4 grid grid-rows-2 grid-cols-5 gap-x-16 gap-y-4 place-items-center">
                  <FeatureButton
                   name="Italian" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type","Italian");

                    currTypeAlreadyDisplayed ? EraseRateOutput : DisplayOutput("type", "Italian");
                   }} 
                  />
                  <FeatureButton name="French" onClick={ () => {
                    var currTypeAlreadyDisplayed = checkVisibility("type","French");

                    currTypeAlreadyDisplayed ? EraseRateOutput : DisplayOutput("type", "French");
                  }} />
                  <FeatureButton name="Cats" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type","Cats");

                    currTypeAlreadyDisplayed ? EraseRateOutput : DisplayOutput("type", "Cats");
                  }} />
                  <FeatureButton name="Classic" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type","Classic");

                    currTypeAlreadyDisplayed ? EraseRateOutput : DisplayOutput("type", "Classic");
                  }} />
                  <FeatureButton name="Truck" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type","Truck");

                    currTypeAlreadyDisplayed ? EraseRateOutput : DisplayOutput("type", "Truck");
                  }}/>
                  <FeatureButton name="Bakery" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type","Bakery");

                    currTypeAlreadyDisplayed ? EraseRateOutput : DisplayOutput("type", "Bakery");
                    console.log(DisplayOutput("type", "Bakery"));
                  }}/>
                  <FeatureButton name="Theme" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type","Theme");

                    currTypeAlreadyDisplayed ? EraseRateOutput : DisplayOutput("type", "Theme");
                  }}/>
                  <FeatureButton name="Pub" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type","Pub");

                    currTypeAlreadyDisplayed ? EraseRateOutput : DisplayOutput("type", "Pub");
                  }}/>     
                  <FeatureButton name="Espresso Bar" onClick={() => {
                    var currTypeAlreadyDisplayed = checkVisibility("type","Espresso Bar");

                    currTypeAlreadyDisplayed ? EraseRateOutput : DisplayOutput("type", "Espresso Bar");
                  }}/>               
                </div>
              ) 
              :selectedLabel === "Find By Rate" ? (
                <div 
                  className="ml-4 grid grid-rows-1 grid-cols-5 gap-x-6 place-items-center">
                  <FeatureButton  name="1 - 2" onClick={() => {
                    // IsVisible(1, 2);
                    var CurrRateAlreadyDisplayed = checkVisibility("rate","", 1,2);

                    CurrRateAlreadyDisplayed ? EraseRateOutput(): DisplayOutput("rate", "", 1, 2); 
                  }}/>
                  <FeatureButton name="2 - 3" onClick={() => {
                    var CurrRateAlreadyDisplayed = checkVisibility("rate", "", 2, 3);

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
                <div className="grid grid-rows-2 gap-2 place-items-center">

                  <input
                    id='input-bar'
                    placeholder='Enter a name' 
                    className={
                      (inputBar ? 'px-5 py-2 h-full w-130 border-3 border-amber-900 shadow-lg shadow-black/50 rounded-2xl focus:ring-3 ring-white  hover:bg-amber-300': 'hidden')}

                    //Controlling an input with a state variable 
                    value = {inputBarValue}
                    onChange={e => setInputBarValue(e.target.value)}
                    >
                  </input>

                  <button
                    className="bg-amber-900 text-white py-1 h-full w-20 border-3 border-black shadow-lg shadow-black/50 rounded-2xl cursor-pointer hover:bg-amber-300 active:bg-amber-400"
                    value = {inputBarClicked}
                    onClick={async () => {

                    var CurrRateAlreadyDisplayed = checkVisibility("name");
                    
                    CurrRateAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("name");

                    try{
                      const c = await getUserCurrPosition();

                      setCoords(c);
                      await getShopsByName(inputBarValue);
                    }
                    catch{
                      setError("Could not get your location.");
                    }
                  }}
                  >Search
                  </button>
                
                </div>
              )
              :selectedLabel === "Closest Coffeeshop" ? (
                <div className="w-full h-full flex items-center justify-center"> 
                  <div
                    
                    onClick={async () => {

                      var CurrRateAlreadyDisplayed = checkVisibility("closest");
                      CurrRateAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("closest");
                    
                      try{
                        var c = await getUserCurrPosition();
                        setCoords(c);
                        setAmount(1);
                        await getClosestShops(1,c)
                      }
                      catch{
                        setError("Could not get your location.");
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

                      var CurrRateAlreadyDisplayed = checkVisibility("distance");
                      console.log(CurrRateAlreadyDisplayed);
                      CurrRateAlreadyDisplayed ? EraseRateOutput() : DisplayOutput("distance");
                      console.log(CurrRateAlreadyDisplayed);

                      try{
                        const c = await getUserCurrPosition();

                        setCoords(c);
                        setAmount(9);
                        await getClosestShops(9, c);
                      }
                      catch{
                        setError("Could not get your location.");
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

          <div id='dropDownButton' className='w-full h-full border-l-2 col-span-3 grid items-center justify-center'>


            <div
              id="options-pointer-image-label" 
              className='border-2 border-gray-300 w-40 px-2 py-1 rounded font-bold cursor-pointer flex justify-between relative bg-white shadow-sm select-none '
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
              

              {isOpen && (
                <div 
                  className="inline- border border-gray-200 rounded-md bg-white absolute top-[40px] w-[400px] shadow-md"
                >
                 
                  <div className="cursor-pointer hover:bg-red-200 px-4 p-4" onClick={() => {choose("type"); popInputBar(false); setIsVisible(false)} }>Find By Type</div>
                  <div className="cursor-pointer hover:bg-red-200 px-4 p-4" onClick={() => {choose("name"); popInputBar(true); setIsVisible(false);} }>Find By Name</div>
                  <div className="cursor-pointer hover:bg-red-200 px-4 p-4" onClick={() => {choose("rate"); popInputBar(false); setIsVisible(false)}}>Find By Rate</div>
                  <div className="cursor-pointer hover:bg-red-200 px-4 p-4" onClick={() => {choose("closest"); popInputBar(false); setIsVisible(false)}}>Closest Coffeeshop</div>
                  <div className="cursor-pointer hover:bg-red-200 px-4 p-4" onClick={() => {choose("distance"); popInputBar(false); setIsVisible(false)}}>Find By Distance</div>
                </div>
              )}

              
              
            </div>

              {
                /*
                * If the chosen mode is "Find By Type" or "Find By Rate", then a second dropdown component will show up under the first one 
                */
                (selectedLabel === "Find By Type" || selectedLabel === 'Find By Rate') && <div><SecondDropdown chooseDistance={chooseDistance}/></div>
              } 

          </div>
          
        </div>

        
        <div>

              
          {mode === "distance" ? (
            <div id="output-label" className={isVisible ? "" : "hidden"}>
              <ShopsOutput mode={mode} output={output} /* isVisible={isVisible} */ />
            </div>
          ):mode === "type" ? (
            <div id="type-label" className={isVisible ? "" : "hidden"}>
              <ShopsOutput mode={mode} output={output} /* isVisible={isVisible} distance={distance} */ />
            </div>
          )
           : mode === "rate" ? (
            <div id="rating-label" className={isVisible ? "" : "hidden"}>
              <ShopsOutput mode={mode} output={output} /* isVisible={isVisible} distance={distance} */ />
            </div>
          ) : mode === "closest" ? (
            <div id="closest-label" className={isVisible ? "" : "hidden"}>
              <ShopsOutput mode={mode} output={output} /* isVisible={isVisible} distance={distance} */ />
            </div>
          ) 
          : mode === "name" ? (
            <div id="name-label" className={isVisible ? "" : "hidden"}>
              <ShopsOutput mode={mode} output={output} /* isVisible={isVisible} inputBarValue={inputBarValue} inputBarClicked={inputBarClicked}*/ />
            </div>
          )
          : null}
        </div>

      </div>
    </div>
  )
}

export default FeaturesPage