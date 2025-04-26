import React from 'react'
import{assets} from '../assets/assets';
import heroBanner from '../assets/hero-banner-desktop__1_.gif';

const Hero = () => {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] border border-gray-400">
  {/* Background GIF */}
  <img
    src={heroBanner}
    alt="Hero Banner"
    className="absolute inset-0 w-full h-full object-cover z-0"
  />

  {/* Overlay (optional for better text visibility) */}
  <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

  {/* Text Content */}
  <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-[#ffffff] px-4 ml-0">
    <div className="flex items-center gap-2 mb-2">
      <p className="w-8 md:w-11 h-[2px] bg-white"></p>
      <p className="font-medium text-sm md:text-base">OUR BESTSELLER</p>
    </div>
    <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
      Latest Arrivals
    </h1>
    <div className="flex items-center gap-2 mt-2">
      <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
      <p className="w-8 md:w-11 h-[2px] bg-white"></p>
    </div>
  </div>
</div>

  
  )
}

export default Hero
