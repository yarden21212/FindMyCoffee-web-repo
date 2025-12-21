import React, { useState } from 'react'
import Header from '../components/Header'
import Picture from '../assets/pictures/website-logo-transparent.png'
import axios from 'axios'
import DropDownButton from '../components/DropDownButton'
import HorizontalDropDownButton from '../components/HorizontalDropDownButton'
import SpinnerLoader from '../components/SpinnerLoader'
import SuccessMessage from '../components/SuccessMessage'

const CreateCoffeeshopPage = () => {

  {/* Spinner and message */}
  const [loading, setLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(null);

  {/* HTTP call attributes */}
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
  
  {/* Dropdown button attributes */}
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


  {/* Errors: error for each field */}
  const[error, setError] = useState(false);
  const[displayError, setDisplayError] = useState("");

  const throwError = () => {
    return (
      <div className='flex items-center justify-center bg-red-300 mt-10 p-2 rounded-md border-4 border-white w-full'>
        <div className='font-bold text-lg'>{displayError}</div>
      </div>
    )
  }

  //Clean the states once a shop creation succeeded 
  const resetForm = () => {
  setBusinessName('');
  setType('');
  setTypePressed(false);
  setPriceLevel('');
  setPricLevelPressed(false);
  setTitle('');
  setVicinity('');
  setCountry('');
  setCity('');
  setStreet('');
  setState('');
  setError(false);
  setDisplayError('');
  setTypeDropDownVisible(false);
  setPriceLevelDropDownVisible(false);
  };


  {/* Handle the information the user entered and creates a coffee shop. 
    Also handles error messages for each missing field */}
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setCreateSucceeded();

    if(type == ''){
      setError(true);
      setDisplayError('Please fll "Type" field!');
    }
    else if(priceLevel == ''){
      setError(true);
      setDisplayError('Please fll "Price Level" field!');
    }
    else if(businessName == ''){
      console.log("Here!");
      setError(true);
      setDisplayError('Please fll "Business Name" field!');
    }
    else if(street == ''){
      setError(true);
      setDisplayError('Please fll "Street" field!');
    }
    else if(city == ''){
      setError(true);
      setDisplayError('Please fll "City" field!');
    }
    else if(country == ''){
      setError(true);
      setDisplayError('Please fll "Country" field!');
    }
    else if(title == ''){
      setError(true);
      setDisplayError('Please fll "Title" field!');
    }
    else if(vicinity == ''){
      setError(true);
      setDisplayError('Please fll "Vicinity" field!');
    }
    else
    {
      /* Spinner */
      setLoading(true);

      setError(false);
      setDisplayError('');
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
        resetForm();
        setLoading(false);
      })
      .catch((err) => {
        console.log("Http POST failed: the error is: " + err);
        setCreateSucceeded(false);
        setLoading(false);
      })
    }
  }

  return (
    <div className='min-h-screen bg-red-950 '>
      <Header/>

      
      <div className='flex items-center justify-center'>
        <div className="bg-gray-200 w-210 h-210 rounded-full border-amber-950 border-5 shadow-[0_0_80px_theme('colors.gray-300')] overflow-hidden
          flex items-center justify-center">


          <form onSubmit={handleSubmit} noValidate class="">
      
            {/* This section toggles the type dropdown */}
            <div className='flex items-center justify-center'>
              <div className="mb-4 ">
              <div 
                class="block text-red-700 text-xl font-bold mb-2 cursor-pointer" 
                onClick={() => setTypeDropDownVisible(prev => !prev)} //Once click -> Makes the different type's buttons visible
              >
                Type: click and choose type!
              </div>
              
              <div className='flex items-center justify-center ml-19 w-20 bg-transparent animate-pulse'>
                {typePressed && <div className='text-amber-900 font-bold border-amber-800 border-2 rounded-full p-2 '>{type}</div>}
              </div>

                  <div className='grid grid-cols-2 justify-items-center place-items-center ml-15 mt-2'>
                    <div className='flex items-center justify-center text-white'>

                      {/* Creates the buttons with logic inside HorizontalDropDownButton component */}
                      {/* Passing data from child component into parent */}
                      {
                        typeDropDownVisible && 
                        <HorizontalDropDownButton
                          options={types} 
                          handleChildData={handleChildDataForType} 
                          groupNumber={1}
                        />
                      }
                    </div>
                  </div>
              </div>
            </div>

              {/* This section toggles the price dropdown */}
              <div className='flex items-center justify-center mt-5'>
                <div className="mb-4 ">
                  <div 
                    className="block text-blue-700 text-xl font-bold mb-2 cursor-pointer"
                    onClick={() => setPriceLevelDropDownVisible(prev => !prev)}
                  >
                    Price level: click and choose price level! 
                  </div>

                  <div className='flex items-center justify-center ml-19 w-20 bg-transparent animate-pulse'>
                    {priceLevelPressed && (
                      <div className='text-amber-900 font-bold border-amber-800 border-2 rounded-full p-2 ml-29'>
                        {priceLevel}
                      </div>
                    )}
                  </div>
                
                
                <div className='grid grid-cols-2 justify-items-center place-items-center ml-27 mt-1'>
                  <div className='flex items-center justify-center text-white'>

                    {/* Creates the buttons with logic inside HorizontalDropDownButton component */}
                    {/* Passing data from child component into parent */}
                    {
                      priceLevelDropDownVisible && 
                      <HorizontalDropDownButton 
                        options={prices} 
                        handleChildData={handleChildDataForPriceLevel} 
                        groupNumber={2}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-start justify-center mt-10'>
              <img className='h-60 mr-12' src={Picture}></img>

              <div className="grid-cols-5 place-items-center justify-items-center">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="businessName">
                    Business Name
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="business" type="text" placeholder="Business Name" onChange={(e) => setBusinessName(e.target.value)}/>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="title" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vicinity">
                    Vicinity
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="vicinity" type="text" placeholder="Vicinity" onChange={(e) => setVicinity(e.target.value)}/>
                </div>
              </div>
              
              
              <img className='h-60 ml-12' src={Picture}></img>
            </div>
            
            <div className='mt-2 flex items-center justify-center'>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                  Country
                </label>
                <input className="shadow appearance-none border rounded w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline grow mr-2" 
                id="country" type="text" placeholder="Country" onChange={(e) => setCountry(e.target.value)}/>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                  City
                </label>
                <input className="shadow appearance-none border rounded w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline grow mr-2" 
                id="city" type="text" placeholder="City" onChange={(e) => setCity(e.target.value)}/>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                  Street
                </label>
                <input className="shadow appearance-none border rounded w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline grow mr-2" 
                id="street" type="text" placeholder="Street" onChange={(e) => setStreet(e.target.value)}/>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                  State
                </label>
                <input className="shadow appearance-none border rounded w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline grow mr-2" 
                id="state" type="text" placeholder="State" onChange={(e) => setState(e.target.value)}/>
              </div>
            </div>
            
            
            <div className='grid place-items-center justify-items-center mt-5'> 
              <button className="w-lg h-12 rounded-full border-amber-950 border-3 shadow-[0_0_20px_theme('colors.amber.900')] cursor-pointer">Create a Coffee Shop!</button>
              {/* Spinner */}
              {loading == true && <SpinnerLoader/>}

              <div className='text-lg font-bold'>
                {createSucceeded === true ? ( <p className="text-green-600 mt-4">Shop was created!</p>) 
                : createSucceeded === false ? (
                  <div className='grid place-items-center justify-items-center'>
                    <p className="text-red-600 mt-4">Shop failed to be created.</p>
                    <p className="text-red-600 mt-1">Try to look on google for accurate info.</p>
                  </div>
                ) 
                : null
                }
              </div>
            </div>
                              {/* ------------- Error message ------------- */}
          {error && throwError()}
          </form>


        </div >

      </div>
    </div>
    
  )
}

export default CreateCoffeeshopPage