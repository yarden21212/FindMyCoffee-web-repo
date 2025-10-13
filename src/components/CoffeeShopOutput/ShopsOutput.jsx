import React from 'react'

const ShopsOutput = (props) => {
  return(
   <div>
      { Array.isArray(props.output) && 
        props.output.map((shop, index) => (
          <div 
            key={shop.placeId || shop.name + index} 
            className=" bg-amber-700/80 border-3 rounded-2xl p-3 text-white"
          >
          <p>Name: <strong>{shop.name}</strong></p>
          <p>Vicinity: <strong>{shop.vicinity}</strong></p> 
          <p>Rating: <strong>{shop.rating}⭐</strong></p>
          <p>Distance: <strong>{shop.distanceKm}km</strong></p>
          <p>Price-Level: <strong>{shop.priceLevel}</strong></p>
          </div>
        ))
      }  
      
    </div>
  )
}

export default ShopsOutput