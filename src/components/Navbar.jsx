import React, { useContext } from 'react'
import{assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [visible,setVisible] = useState(false);

    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems}= useContext(ShopContext)
    const logout = () =>{
      navigate('/login')
      localStorage.removeItem('token')
      setToken('')
      setCartItems({})
    }


  return (
    <div className='flex item-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className='w-10 h-10 rounded-full ' alt="" /></Link>
      {/* <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
      The Jersey Hub
    </h1> */}
    
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700' >
        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>

      <div className='flex item-center gap-6'>
          <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 h-6 cursor-pointer' alt="" />

          <div className="relative group z-50">
  <img
    onClick={() => token ? null : navigate('/login')}
    className="w-5 cursor-pointer"
    src={assets.profile_icon}
    alt=""
  />
  {token && (
    <div className="absolute right-0 top-full hidden group-hover:block pt-2 z-50">
      <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
        {/* <p className="cursor-pointer hover:text-black">My Profile</p> */}
        <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
        <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
      </div>
    </div>
  )}
</div>

          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
            <p className='absolute right-[-5px] bottom-[10px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
          </Link>
          <img onClick={()=>setVisible(true)} src={assets.menu_icon}className='w-5 h-6 cursor-pointer sm:hidden' alt="" />
      </div>
      {/* Sidebar menu for small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full':'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
              <div onClick={()=>setVisible(false)} className='flex item-center gap-4 p-3 cursor-pointer'>
                  <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                  <p>Back</p>
              </div>
              <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
          </div>
      </div>
    </div>
  )
}

export default Navbar
