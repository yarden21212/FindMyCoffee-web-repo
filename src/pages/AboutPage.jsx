import React from 'react'
import Header from '../components/Header'
import firstPicture from '../assets/pictures/Coffee-machine-at-bar-enviroment.png'
import secondPicture from '../assets/pictures/coffee-main-background.png'
import { Link, NavLink } from 'react-router-dom'

const AboutPage = () => {
  return (
    <div className='bg-amber-100 min-h-screen'>
      <div className='bg-zinc-200  shadow-2xl'>
        <Header />
      </div>
        <div className="grid grid-cols-11 gap-10 justify-items-end mr-50 mt-10">
          <div className="col-span-2"></div>
          <div className="col-span-3">
            <p className='text-7xl font-semibold mb-5'>About Us</p>
            <p>
              FindMyCoffee is willing to be the first website\application with one and only purpose, to find your perfect coffee!
              Want a specific enviroment?
              Want a specific type of coffee-shop? are you cats fan? classic fan? french or italian fan? This application is exactly for you!
              Would you like to know where is the perfect coffee-shop for you? Use meeee
              With me, you can find the specific type of coffee-shop, the closest one and even the best rated one, more and more!

              "FindMyCoffee"
            </p>
          </div>
          <div className="col-span-6 w-80 border-4 rounded-md">
            <img src={firstPicture}/>
          </div>
          {/* <div className="col-span-1">right gap</div> */}
        </div>

        <div>
          <div className="grid grid-cols-11 gap-10 justify-items-end mr-50 mt-10">
            <div className="col-span-2"></div>
            <div className="col-span-3">
              <p className='text-7xl font-semibold mb-5'>Start Exploring</p>
              <p>
                You won't know until you try, right?
                Just Click and Experience!
              </p>
            </div>
            <NavLink 
              to={'/features'}
              className="col-span-6 w-80 border-4 rounded-full mb-10">
              <img className="rounded-full" src={secondPicture}/>
            </NavLink>
            {/* <div className="col-span-1">right gap</div> */}
          </div>
        </div>
      
      
    </div>
  )
}

export default AboutPage