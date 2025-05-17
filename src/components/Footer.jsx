import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm'>

                <div>
                    <img src={assets.logo} className='mb-3 w-32 h-22' />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Built for champions, crafted with passion — every piece reflects the spirit of the game. © 2025 The Jersey Hub. All rights reserved. Follow us for the latest drops and updates. Need help? Visit our Support, Shipping & Returns, or Privacy Policy pages.</p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-3'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        {/* <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li> */}
                        <NavLink to="/" className="text-gray-500 hover:text-black">Home</NavLink>
                        <NavLink to="/about" className="text-gray-500 hover:text-black">About Us</NavLink>
                        <NavLink to="/orders" className="text-gray-500 hover:text-black">Delivery</NavLink>
                        <NavLink to="/contact" className="text-gray-500 hover:text-black">Privacy Policy</NavLink>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-3'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+91 73269 83364</li>
                        <li>+91 93485 74287</li>
                        <li>contact@thejerseyhub.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@ The Jersey Hub.com - All Right Reserved.</p>
            </div>


        </div>
    )
}

export default Footer
