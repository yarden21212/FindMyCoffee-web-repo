import axios from "axios";
import { useEffect, useState } from "react";

import React from 'react'

const HomePage = () => {
  return (
    <div className="h-2000">

      <div className="bg-red-100 border-1 border-black w-full h-20 flex justify-around sticky top-0 items-center ">
        <button className="bg-blue-300 border-2 border-blue-500 rounded-md h-12 w-20 cursor-pointer">Home</button>
        <button className="bg-red-300 border-2 border-red-500 rounded-md h-12 w-20 cursor-pointer">About</button>
      </div>

    </div>
  )
}

export default HomePage

