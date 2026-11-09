import { Link } from 'react-router-dom'
import IconImage from '../assets/pictures/website-logo-transparent.png'
import background from '../assets/pictures/FindMyCoffee-Background.png'
import Header from '../components/Header'

const HomePage = () => (
  <div className="min-h-screen bg-[#fff8e7]">
    <Header />
    <main className="mx-auto w-full max-w-4xl px-4 py-8 text-center font-serif sm:py-12">
      <div className="rounded-2xl border border-amber-900/25 bg-[#fff8e7]/95 px-4 py-6 shadow-sm sm:px-8">
        <h1 className="text-3xl font-semibold leading-tight text-[#4a2d1a] sm:text-5xl">Welcome to FindMyCoffee</h1>
        <p className="mt-3 text-base text-[#4a2d1a] sm:text-xl">Discover and share the best coffee spots.</p>
      </div>
      {/* Keep the shortcut aligned with the illustration as it scales. */}
      <div className="relative mx-auto w-full max-w-2xl">
        <img src={background} alt="" className="block h-auto w-full" />
        <div className="absolute left-1/2 top-[88%] w-[22%] -translate-x-1/2">
          <span aria-hidden="true" className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap text-base font-semibold text-[#4a2d1a] motion-safe:animate-[coffee-hint-fade_2.5s_ease-in-out_infinite] sm:mr-6 sm:text-xl">Click me</span>
          <span aria-hidden="true" className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap text-base font-semibold text-[#4a2d1a] motion-safe:animate-[coffee-hint-fade_2.5s_ease-in-out_infinite] sm:ml-6 sm:text-xl">Click me</span>
          <Link
            to="/features"
            aria-label="Find coffee shops"
            className="inline-flex aspect-square w-full items-center justify-center rounded-full border-2 border-amber-950 bg-amber-100 p-[12%] shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 sm:border-4"
          >
            <img
              src={IconImage}
              alt=""
              className="h-full w-full object-contain motion-safe:animate-spin"
              style={{ animationDuration: '5s' }}
            />
          </Link>
        </div>
      </div>
    </main>
  </div>
)

export default HomePage
