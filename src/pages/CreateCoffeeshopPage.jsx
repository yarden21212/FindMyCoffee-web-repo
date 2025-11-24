import React, { useState } from 'react'
import Header from '../components/Header'
import Picture from '../assets/pictures/website-logo-transparent.png'
import axios from 'axios'
import DropDownButton from '../components/DropDownButton'
import HorizontalDropDownButton from '../components/HorizontalDropDownButton'
const CreateCoffeeshopPage = () => {

  const [businessName, setBusinessName] = useState('');
  const [type, setType] = useState('');
  const [typePressed, setTypePressed] = useState(false); //Used to flag if the user pressed on a type or not in order to know when to display the type
  const [priceLevel, setPriceLevel] = useState('');
  const [priceLevelPressed, setPricLevelPressed] = useState(false); //Used to flag if the user pressed on a price or not in order to know when to display the type
  const [title, setTitle] = useState('');
  const [vicinity, setVicinity] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [state, setState] = useState(' ');
  const [createSucceeded, setCreateSucceeded] = useState();
  
  const [typeDropDownVisible, setTypeDropDownVisible] = useState(false);
  const [priceLevelDropDownVisible, setPriceLevelDropDownVisible] = useState(false);

  const types = ["Italian", "French", "Cats", "Classic", "Truck", "Bakery", "Theme", "Pub", "Espresso Bar"];
  const prices = [1, 2, 3];
  

  const handleChildDataForType = (data) => {
    setType(data);
    setTypePressed(true);
  };

  const handleChildDataForPriceLevel = (data) => {
    setPriceLevel(data);
    setPricLevelPressed(true);
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setCreateSucceeded();

    // const formData = new FormData(e.target);

    // const selectedType = formData.get('dropdown-group-1');
    // console.log('Selected type:', selectedType);

    // const selectedPriceLevel = priceLevel
    // console.log('Selected price level:', selectedPriceLevel);

    // // Delete it later:
    // setType(selectedType);

    // // Delete it later:
    // setPriceLevel(selectedPriceLevel);

    // const newBusiness = {businessName, type, priceLevel, title, vicinity, country, city, street, state};
    await axios.post("/api/CoffeeShop/CreateShop", {
      BusinessName: businessName,
      Type: type,
      PriceLevel:priceLevel,
      Street:street,
      City: city,
      Country:country,
      State: state,
      Title: title,
      Vicinity: vicinity
    }).then((response) => {
      console.log("A new business was created!");
      console.log("Response status: " + response.status, "response data: " +response.data);
      setCreateSucceeded(true);
    })
    .catch((err) => {
      console.log("Http POST failed: the error is: " + err);
      setCreateSucceeded(false);
    })
  }

  return (
    <div className='bg-red-950 '>
      <Header/>

      <div className='flex items-center justify-center'>
        <div className="bg-gray-200 w-210 h-210 rounded-full border-amber-950 border-5 shadow-[0_0_80px_theme('colors.gray-300')] overflow-hidden
          flex items-center justify-center">





          <form onSubmit={handleSubmit} noValidate class="">
      
            {/* Button for choosing a type */}
            <div className='flex items-center justify-center'>
              <div class="mb-4 ">
                <label class="block text-red-700 text-xl font-bold mb-2 cursor-pointer" htmlFor="type">
                  <div 
                    onClick={() => setTypeDropDownVisible(prev => !prev)}>
                    Type: click and choose type!  
                  </div>
                  <div className='flex items-center justify-center ml-19 w-20 bg-transparent animate-pulse'>
                    {typePressed && <div className='text-amber-900 font-bold border-amber-800 border-2 rounded-full p-2 '>{type}</div>}
                  </div>
                </label>
                
                  <div className='grid grid-cols-2 justify-items-center place-items-center ml-15'>
                    <div className='flex items-center justify-center text-white'>

                      {
                        typeDropDownVisible && <HorizontalDropDownButton options={types} handleChildData={handleChildDataForType} groupNumber={1}/>
                      }
                    </div>
                  </div>
              </div>
            </div>

            {/* Button for choosing a price */}
             <div className='flex items-center justify-center mt-10'>
              <div class="mb-4 ">
                <label class="block text-blue-700 text-xl font-bold mb-2 cursor-pointer" htmlFor="priceLevel">
                  <div 
                    onClick={() => setPriceLevelDropDownVisible(prev => !prev)}>
                    Price level: click and choose price level!  
                  </div>
                  <div className='flex items-center justify-center ml-19 w-20 bg-transparent animate-pulse'>
                    {priceLevelPressed && <div className='text-amber-900 font-bold border-amber-800 border-2 rounded-full p-2 '>{priceLevel}</div>}
                  </div>
                </label>
                
                  <div className='grid grid-cols-2 justify-items-center place-items-center ml-15'>
                    <div className='flex items-center justify-center text-white'>

                      {
                        priceLevelDropDownVisible && <HorizontalDropDownButton options={prices} handleChildData={handleChildDataForPriceLevel} groupName={2}/>
                      }
                    </div>
                  </div>
              </div>
            </div>

            <div className='flex items-start justify-center mt-10'>
              <img className='h-60 mr-12' src={Picture}></img>

              <div class="grid-cols-5 place-items-center justify-items-center">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="businessName">
                    Business Name
                  </label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="business" type="text" placeholder="Business Name" onChange={(e) => setBusinessName(e.target.value)}/>
                </div>

                {/* <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceLevel">
                    Price Level
                  </label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="priceLevel" type="text" placeholder="Price Level" onChange={(e) => setPriceLevel(e.target.value)}/>
                </div> */}

                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="title" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="vicinity">
                    Vicinity
                  </label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="vicinity" type="text" placeholder="Vicinity" onChange={(e) => setVicinity(e.target.value)}/>
                </div>
              </div>
              
              
              <img className='h-60 ml-12' src={Picture}></img>
            </div>
            
            <div className='mt-2 flex items-center justify-center'>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                  Country
                </label>
                <input class="shadow appearance-none border rounded w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline grow mr-2" 
                id="country" type="text" placeholder="Country" onChange={(e) => setCountry(e.target.value)}/>
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                  City
                </label>
                <input class="shadow appearance-none border rounded w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline grow mr-2" 
                id="city" type="text" placeholder="City" onChange={(e) => setCity(e.target.value)}/>
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                  Street
                </label>
                <input class="shadow appearance-none border rounded w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline grow mr-2" 
                id="street" type="text" placeholder="Street" onChange={(e) => setStreet(e.target.value)}/>
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                  State
                </label>
                <input class="shadow appearance-none border rounded w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline grow mr-2" 
                id="state" type="text" placeholder="State" onChange={(e) => setState(e.target.value)}/>
              </div>
            </div>
            
            
            <div className='grid place-items-center justify-items-center mt-5'> 
              <button className="w-lg h-12 rounded-full border-amber-950 border-3 shadow-[0_0_20px_theme('colors.amber.900')] cursor-pointer">Create a Coffee Shop!</button>

              <div className='text-lg font-bold'>
                {createSucceeded === true ? ( <p className="text-green-600 mt-4">Shop was created!</p>) 
                : createSucceeded === false ? ( <p className="text-red-600 mt-4">Shop failed to be created</p>) 
                : null
                }
              </div>
            </div>
          </form>

        </div >
      </div>
      
    </div>
    
  )
}

export default CreateCoffeeshopPage