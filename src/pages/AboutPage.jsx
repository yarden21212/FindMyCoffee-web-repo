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

        <div className="mt-10 flex justify-between place-items-start gap-10 justify-items-end mr-30">

          <div className="ml-30">
            <p className="text-6xl font-semibold text-amber-950 pr-70 leading-tight">
              About us:
            </p>
            <p className="text-xl font-semibold text-amber-800 pr-70">
              FindMyCoffee is willing to be the first website with one and only purpose, to find your perfect coffee! <br /><br />
              Want a specific environment? A specific type of coffee-shop? <br /><br />
              Are you a cat lover? Classic fan? French or Italian addicted? This application is exactly for you! Would you like to know where is the perfect coffee-shop for you? <br /><br />
              With me, you can find the specific type of coffee-shop, the closest one and even the best rated one, more and more! <br /><br />
              "FindMyCoffee"
            </p>
            
          </div>
          <div className="w-140 border-4 rounded-md">
            <img className='hover:animate-pulse hover:[animation-duration:6s]' src={firstPicture}/>
          </div>
        </div>
        
         <div>
          <div className="mt-20 flex justify-between place-items-start gap-10 justify-items-end mr-30">
            <div className="ml-30">
              <p className='text-7xl font- font-semibold mb-5 text-amber-950  hover:text-amber-700 '>Start Exploring</p>
              <p className='text-xl font-semibold text-amber-800'>
                You won't know until you try, right?
              </p>
               <p className='mt-30 text-5xl font-semibold text-emerald-300 text-shadow-lg'>
                Just Click on the image and Experience!
              </p>
            </div>
            <NavLink 
              to={'/features'}
              className="col-span-6 w-80 border-4 rounded-full mb-10">
              <img className="rounded-full hover:animate-spin hover:[animation-duration:7s] " src={secondPicture}/>
            </NavLink>
          </div>
        </div>
      
      
    </div>
  )
}

export default AboutPage