import React, { useState } from 'react'
import downArrowIcon from '../assets/down-arrow.svg'

const DistanceDropdown = ({chooseDistance}) => {

   const KM_LABELS = {
      closest: "0 to 5km",
      close: "5 to 10k",
      mid: "10 to 30k",
      far: "30 to 60km",
      any: "Any"
    };
    const [selectedKmLabel, setSelectedKmLabel] = useState(KM_LABELS["any"]);
    const [isDistanceOpen, setIsDistanceOpen] = useState(false);
    // const [kmMode, setKmMode] = useState("any");

    // const [kmoption, setkmOption] = useState("none"); //Tracks which km option was pressed, so we can output the right output compared to the distance chosen
    const chooseKm = (chosenKmMode) => {
      // setKmMode(chosenKmMode);
      setSelectedKmLabel(KM_LABELS[chosenKmMode]);
      setIsDistanceOpen(false);
    };

    const distanceDropdown = () => {
      setIsDistanceOpen(!isDistanceOpen);
    };


  return (
    
     <div
      id="extra-dropdown" 
      className='border-2 border-gray-300 w-40 px-2 py-1 rounded font-bold cursor-pointer flex justify-between relative bg-white shadow-sm select-none'
      onClick={distanceDropdown}
    >
      <div 
        id="distance-options"
        className='text-[14px]'
        >{selectedKmLabel}
      </div>


      <div
        id="pointer-image" 
        className='flex items-center justify-center'
      >
        <img src={downArrowIcon} className='w-3 ml-1'/>
      </div>
      
      {isDistanceOpen && (
        <div 
          className="inline- border border-gray-200 rounded-md bg-white absolute top-[40px] w-[400px] shadow-md"
        >
          
          <div className="cursor-pointer hover:bg-gray-200 px-4 p-4" onClick={() => {chooseKm("closest"); setSelectedKmLabel(KM_LABELS["closest"]); chooseDistance("closest")} }>0 to 5 km</div>
          <div className="cursor-pointer hover:bg-gray-200 px-s4 p-4" onClick={() => {chooseKm("close"); setSelectedKmLabel(KM_LABELS["close"]); chooseDistance("close")} }>5 to 10km</div>
          <div className="cursor-pointer hover:bg-gray-200 px-4 p-4" onClick={() => {chooseKm("mid"); setSelectedKmLabel(KM_LABELS["mid"]); chooseDistance("mid")}}>10 to 30km</div>
          <div className="cursor-pointer hover:bg-gray-200 px-4 p-4" onClick={() => {chooseKm("far"); setSelectedKmLabel(KM_LABELS["far"]); chooseDistance("far")}}>30 to 60km</div>
          <div className="cursor-pointer hover:bg-gray-200 px-4 p-4" onClick={() => {chooseKm("any"); setSelectedKmLabel(KM_LABELS["any"]); chooseDistance("any")}}>Any</div>
        </div>
      )}
    </div>
  )
}

export default DistanceDropdown