import React, { useState, useEffect } from "react"
import Header from '../components/Header'
import downArrowIcon from '../assets/down-arrow.svg'
import FeatureButton from "../components/FeatureButton"
import axios from "axios"
import CoffeeShopList from "../components/CoffeeShopOutput/CoffeeShopList"
import getUserCurrPosition from "../Services/GetUserCurrPosition";

const FeaturesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Options");
  const [inputBar, setInputBar] = useState(false);
  const [coords, setCoords] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");
  const [amount, setAmount] = useState(0);

  /* Buttons */
  const [justClick, setJustClick] = useState(false);
  const [isVisible ,setIsVisible] = useState(false);

  // const getShopCoords = () => {
  //   setSuccess("");
  //   setError("");

    
  //   try{
  //     console.log("Im here(1)");
  //     getUserCurrPosition(setCoords);
  //     console.log(coords)
  //   }catch{
  //     setError('Unexpected server response.');
  //   }
  // };

  //  useEffect(() => {
  //   if (!coords || (coords.latitude === 0 && coords.longitude === 0)) return;
  // }, [coords]);

  
  const getOutput = async (numOfCoffeeshops, currCoords) => {

    console.log("currCoords param:", currCoords);

    if (!currCoords || (currCoords.latitude === 0 && currCoords.longitude === 0)) {
      setError("Get your location first.");
      return;
    }

    try {
      const res = await axios.post("/api/CoffeeShop/FindClosestCoffeeshops", {
      userLat: currCoords.latitude,
      userLng: currCoords.longitude,
      amount: numOfCoffeeshops,
      });

      setSuccess("Connected to the database");
      setOutput(res.data);
    } catch (e) {
      const msg =
        e?.response?.data?.message || e.message || "Didn't manage to connect to the server";
      setError(msg);

    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const choose = (label) => {
    setSelectedLabel(label);
    setIsOpen(false);
  };

  const popInputBar = (boolValue) => {
    setInputBar(boolValue)
  };

  const showClosestShop = () => {
    setIsOpen(true);

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
                  <FeatureButton name="Italian" />
                  <FeatureButton name="French" />
                  <FeatureButton name="Cats" />
                  <FeatureButton name="Classic" />
                  <FeatureButton name="Truck" />
                  <FeatureButton name="Bakery" />
                  <FeatureButton name="Theme" />
                  <FeatureButton name="Pub" />                 
                </div>
              )
              :selectedLabel === "Find By Rate" ? (
                <div className="ml-4 grid grid-rows-1 grid-cols-5 gap-x-6 place-items-center">
                  <FeatureButton name="1-2" />
                  <FeatureButton name="2-3" />
                  <FeatureButton name="3.5 - 4" />
                  <FeatureButton name="4 - 4.5" />               
                  <FeatureButton name="4.5 - 5" />               
                </div>
              )
              :selectedLabel === "Find By Name" ? (
                <div>
                  <input
                    id='input-bar'
                    placeholder='Enter a name' 
                    className={
                      (inputBar ? 'px-5 py-2 h-full w-130 border-3 border-amber-900 shadow-lg shadow-black/50 rounded-2xl focus:ring-3 ring-white ': 'hidden')}>
                  </input>
                </div>
              )
              :selectedLabel === "Closest Coffeeshop" ? (
                <div className="w-full h-full flex items-center justify-center"> 
                  <div
                    
                    onClick={async () => {

                      if(isVisible){
                        setIsVisible(false);
                        setCoords(null);
                        return;
                      }

                      setIsVisible(true);

                      try{
                        var c = await getUserCurrPosition();
                        setCoords(c);
                        setAmount(1);
                        await getOutput(1,c)
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

                      if(isVisible){
                        setIsVisible(false);
                        setCoords(null);
                        return;
                      }

                      setIsVisible(true);

                      try{
                        const c = await getUserCurrPosition();
                        setCoords(c);
                        setAmount(9);
                        await getOutput(9, c);
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

          <div id='dropDownButton' className='w-full h-full border-l-2 col-span-3 flex items-center justify-center'>


            <div
              id="options-pointer-image-label" 
              className='border-2 border-gray-300 w-40 px-2 py-1 rounded font-bold cursor-pointer flex justify-between relative bg-white shadow-sm select-none'
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
                  className="border border-gray-200 rounded-md bg-white absolute top-[40px] w-[400px] shadow-md"
                >
                 
                  <div className="cursor-pointer hover:bg-gray-200 px-4 p-4" onClick={() => {choose("Find By Type"); popInputBar(false)} }>Find By Type</div>
                  <div className="cursor-pointer hover:bg-gray-200 px-4 p-4" onClick={() => {choose("Find By Name"); popInputBar(true)} }>Find By Name</div>
                  <div className="cursor-pointer hover:bg-gray-200 px-4 p-4" onClick={() => {choose("Find By Rate"); popInputBar(false)}}>Find By Rate</div>
                  <div className="cursor-pointer hover:bg-gray-200 px-4 p-4" onClick={() => {choose("Closest Coffeeshop"); popInputBar(false)}}>Closest Coffeeshop</div>
                  <div className="cursor-pointer hover:bg-gray-200 px-4 p-4" onClick={() => {choose("Find By Distance"); popInputBar(false)}}>Find By Distance</div>

                </div>
              )}

              {selectedLabel === "Find By Type" ? (
                
                <div>

                </div>
              )
              :selectedLabel === "Find By Name" ?(
                <div></div>
              )
              :selectedLabel === "Find By Rate" ?(
                <div></div>
              )
              :selectedLabel === "Closest Coffeeshop" ?(
                <div></div>
              )
              : null}
              
              
            </div>


    
              
          </div>
          
        </div>

        <div  
          id="output-label" 
          className={isVisible ? 
            (`grid grid-cols-${amount/3} rounded-2xl p-20`) : 'hidden' }>
          

          {/* <button onClick={() => setIsVisible(!isVisible)}>Toggle Content</button> */}
          {Array.isArray(output) && 
              output.map((shop, index) => (
                <div key={shop.placeId || shop.name + index} className="row-span-3 bg-amber-700/80 border-3 rounded-2xl p-2 text-white">
                  <p>Name: <strong>{shop.name}</strong></p>
                  <p>Vicinity: <strong>{shop.vicinity}</strong></p>
                  <p>Rating: <strong>{shop.rating}⭐</strong></p>
                  <p>Distance: <strong>{shop.distanceKm}km</strong></p>
                  <p>Price-Level: <strong>{shop.priceLevel}</strong></p>
                </div>
            ))}
        </div>

      </div>
    </div>
  )
}

export default FeaturesPage