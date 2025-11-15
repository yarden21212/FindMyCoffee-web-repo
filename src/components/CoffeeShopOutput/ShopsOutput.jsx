import React from 'react'
// import SpinnerLoader from "../components/SpinnerLoader";

/* JSX variables */

const grid = (mode, amount) => {
  if(mode === 'closest' || mode === 'distance' || mode === 'rate' || mode === 'type' || mode === 'name'){
    if(amount <= 1) return 'grid grid-cols-1 gap-4 mt-4';
    if(amount == 2) return 'grid grid-cols-2 gap-4 mt-4'
    if(amount >= 3) return 'grid grid-cols-3 gap-4 mt-4'
  }
  else return "hidden";
}

const ShopsOutput = ({ mode, output}) => {

  while(!output){
    return "loading...";
  }
  
  if (output.length === 0) return <p>No results</p>;
  
  else{
    const gridClass = grid(mode, output.length);

    return (
      <div 
        className={`mx-auto w-full max-w-6xl ${gridClass}`}
        // style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
      >
        {output.map((shop, /* i */) => (
          <div key={shop.id} className="bg-amber-700/80 rounded-2xl p-3 text-white">
            <p>Name: <strong>{shop.businessName}</strong></p>
            <p>Vicinity: <strong>{shop.vicinity}</strong></p>
            <p>Rating: <strong>{shop.rating}⭐</strong></p>
            {/* <p>Title: <strong>{shop.title}</strong></p> */}
            <p>PriceLevel: <strong>{shop.priceLevel}</strong></p>
            <p>Distance: <strong>{shop.distanceKm}km</strong></p>
            <p>Address: <strong>{shop.state}, {shop.city}</strong></p>
          </div>
        ))}
      </div>
    );
  }
  
};

export default ShopsOutput