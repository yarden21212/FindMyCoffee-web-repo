import React, { useState, useEffect } from 'react'
import logo from '../assets/pictures/bean-eater.svg'
import { ClipLoader } from "react-spinners";

const spinnerLoader = () => {

  const [loading, setLoading] = useState(false);
  const [showImg, setShowImage] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });
    
  return (
    <div>
      {loading ? 

      <ClipLoader
        color={"#F37A24"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      
      :
      null
    }
    </div>
  )
}

export default spinnerLoader