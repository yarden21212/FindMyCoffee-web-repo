import Header from '../components/Header'
import firstPicture from '../assets/pictures/Coffee-machine-at-bar-enviroment.png'
import secondPicture from '../assets/pictures/coffee-main-background.png'
import { NavLink } from 'react-router-dom'

{/* About page which explains about the website with extra option to send the user directly to the "Features page" (the heart of the website) */}
const AboutPage = () => {
  return (
    <div className='bg-amber-100 min-h-screen'>
      <div className='bg-zinc-200  shadow-2xl'>
        <Header />
      </div>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:py-12">

          <div className="min-w-0">
            <p className="mb-4 text-3xl font-semibold text-amber-950 leading-tight sm:text-5xl">
              About us:
            </p>
            <p className="text-base font-semibold leading-relaxed text-amber-800 sm:text-lg">
              FindMyCoffee is willing to be the first website with one and only purpose, to find your perfect coffee! <br /><br />
              Want a specific environment? A specific type of coffee-shop? <br /><br />
              Are you a cat lover? Classic fan? French or Italian addicted? This application is exactly for you! Would you like to know where is the perfect coffee-shop for you? <br /><br />
              With me, you can find the specific type of coffee-shop, the closest one and even the best rated one, more and more! <br /><br />
              "FindMyCoffee"
            </p>
            
          </div>
          <div className="w-full min-w-0 overflow-hidden border-4 rounded-md">
            <img className='block h-auto w-full motion-safe:hover:animate-pulse hover:[animation-duration:6s]' alt='Coffee machine on a café counter' src={firstPicture}/>
          </div>
        </div>
        
         <div>
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:py-12">
            <div className="min-w-0">
              <p className='text-3xl sm:text-5xl font-semibold mb-5 text-amber-950 hover:text-amber-700 '>Start Exploring</p>
              <p className='text-base sm:text-lg font-semibold text-amber-800'>
                You won't know until you try, right?
              </p>
               <p className='mt-6 text-xl sm:text-2xl font-semibold text-amber-950'>
                Just Click on the image and Experience!
              </p>
            </div>
            <NavLink 
              to={'/features'}
              className="block w-full max-w-64 justify-self-center overflow-hidden border-4 border-amber-950 rounded-full mb-6 focus-visible:outline-2 focus-visible:outline-offset-4">
              <img aria-label="Explore coffee shops" className="block h-auto w-full rounded-full motion-safe:hover:animate-spin hover:[animation-duration:7s]" alt="" src={secondPicture}/>
            </NavLink>
          </div>
        </div>
      
      
    </div>
  )
}

export default AboutPage
