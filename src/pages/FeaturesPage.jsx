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
  const {type, setType} = useState('');

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

    setOutput("");
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

  /* TODO: Add parameter of max distance to check the closest stores with the given range of rating*/
  const getShopsByRating = async (ratingMin, ratingMax) => {

    setOutput("");
    setAmount(0);
    setRatingRange(`${ratingMin},${ratingMax}`);
    console.log(ratingRange);

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
      var response = await axios.post('/api/CoffeeShop/GetShopsByName/GetShopsByName', {
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
    setInputBar(boolValue)
  };

    return (

    <div id='top-layer' className='border-y-indigo-100 min-h-screen bg-amber-100' >

      <div className='bg-zinc-200  shadow-2xl'>
        <Header />
      </div>
      

      <div className='h-screen place-items-center justify-self-center-safe'>
        <div 
          id="upper-label"
          className='bg-amber-700/40 w-200 h-30  grid grid-cols-10 items-center gap-10 pt-2
                        border-double border-6 border-black rounded-2xl  
                        shadow-lg shadow-gray-400 box mt-20'>

          
          <div id='left-input-side' className =  'col-span-7 flex items-center justify-center ml-7'>
            
            <div className="h-full w-full flex items-center">

            {
              selectedLabel === "Find By Type" ? (
                <div className="ml-4 grid grid-rows-2 grid-cols-4 gap-x-16 gap-y-4 place-items-center">
                  <FeatureButton name="Italian" onClick={setType('Italian')} />
                  <FeatureButton name="French" onClick={setType('French')} />
                  <FeatureButton name="Cats" onClick={setType('Cats')} />
                  <FeatureButton name="Classic" onClick={setType('Classic')} />
                  <FeatureButton name="Truck" onClick={setType('Truck')}/>
                  <FeatureButton name="Bakery" onClick={setType('Bakery')}/>
                  <FeatureButton name="Theme" onClick={setType('Theme')}/>
                  <FeatureButton name="Pub" onClick={setType('Pub')}/>                 
                </div>
              ) 
              :selectedLabel === "Find By Rate" ? (
                <div 
                  className="ml-4 grid grid-rows-1 grid-cols-5 gap-x-6 place-items-center">
                  <FeatureButton name="1 - 2" onClick={() => {
                    if(isVisible && option === 'rate:1-2'){
                      setIsVisible(false);
                      setCoords(null);
                      setOption('none');
                      return;

                    }
                    
                    setIsVisible(true);
                    setMode("rate");
                    getShopsByRating(1, 2);
                    setOption('rate:1-2');
                  }}/>
                  <FeatureButton name="2 - 3" onClick={() => {
                    
                    if(isVisible && option === 'rate:2-3'){
                      setIsVisible(false);
                      setCoords(null);
                      setOption('none');
                      return;
                    }


                    setIsVisible(true);
                    setMode('rate');
                    getShopsByRating(2, 3);
                    setOption('rate:2-3');
                  }} />
                  <FeatureButton name="3 - 4" onClick={() => {
                    
                    if(isVisible && option === 'rate:3-4'){
                      setIsVisible(false);
                      setCoords(null);
                      setOption('none')
                      return;
                    }


                    setIsVisible(true);
                    setMode('rate');
                    getShopsByRating(3, 4);
                    setOption('rate:3-4');
                  }} />
                  <FeatureButton name="4 - 4.5" onClick={() => {
                    if(isVisible && option === 'rate:4-4.5'){
                      setIsVisible(false);
                      setCoords(null);
                      setOption('none')
                      return;
                    }

                    setIsVisible(true);
                    setMode('rate');
                    getShopsByRating(4, 4.5)
                    setOption('rate:4-4.5')
                  }} />               
                  <FeatureButton name="4.5 - 5" onClick={() => {
                    if(isVisible && option === 'rate:4.5-5'){
                      setIsVisible(false);
                      setCoords(null);
                      setOption('none')
                      return;

                    }
                  
                    setIsVisible(true);
                    setMode("rate");
                    getShopsByRating(4.5, 5)
                    setOption("rate:4.5-5")
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

                    if(isVisible && option === 'name'){
                      setIsVisible(false);
                      setCoords(null);
                      setOption('none');
                      return;
                    }

                    setIsVisible(true);
                    setMode("name");
                    setOption('name');
                    try{
                      const c = await getUserCurrPosition();

                      setCoords(c);
                      await getShopsByName(inputBarValue, c);
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

                      if(isVisible && option === 'closest'){
                        setIsVisible(false);
                        setCoords(null);
                        setOption('none');
                        return;
                      }

                      setIsVisible(true);
                      setMode("closest")
                      setOption('closest');
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

                      if(isVisible && option === 'distance'){
                        setIsVisible(false);
                        setCoords(null);
                        setOption('none');
                        return;
                      }

                      setIsVisible(true);
                      setMode("distance");
                      setOption('distance');
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
              
              <button>{distance}</button>

          </div>
          
        </div>

        
        <div>

              
          {mode === "distance" ? (
            <div id="output-label" className={isVisible ? "" : "hidden"}>
              <ShopsOutput mode={mode} output={output} isVisible={isVisible}/>
            </div>
          ):mode === "type" ? (
            <div id="type-label" className={isVisible ? "" : "hidden"}>
              <ShopsOutput mode={mode} output={output} isVisible={isVisible} distance={distance}/>
            </div>
          )
           : mode === "rate" ? (
            <div id="rating-label" className={isVisible ? "" : "hidden"}>
              <ShopsOutput mode={mode} output={output} isVisible={isVisible} distance={distance}/>
            </div>
          ) : mode === "closest" ? (
            <div id="closest-label" className={isVisible ? "" : "hidden"}>
    
            </div>
          ) 
          : mode === "name" ? (
            <div id="name-label" className={isVisible ? "" : "hidden"}>
              <ShopsOutput mode={mode} output={output} isVisible={isVisible} inputBarValue={inputBarValue} inputBarClicked={inputBarClicked}/>
            </div>
          )
          : null}
        </div>

      </div>
    </div>
  )
}

export default FeaturesPage