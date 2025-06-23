import React from 'react';
import { assets, cities } from '../assets/assets';

const HotelReg = () => {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
           <form className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
            <img src={assets.regImage} alt="" className='w-1/2 rounded-xl hidden md:block'/>

            <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
                <img src={assets.closeIcon} alt="close" className='absolute top-4 right-4 h-4 w-4 cursor-pointer'/>
                <p className='mt-6 text-2xl font-semibold'>Register Your Hotel</p>

                <div className='w-full mt-4'>
                    <label htmlFor='name' className='text-gray-500 font-medium'>Hotel Name</label>
                    <input id='name' type="text" placeholder='Enter hotel name' className='w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required/>
                </div>

                <div className='w-full mt-4'>
                    <label htmlFor='contact' className='text-gray-500 font-medium'>Phone</label>
                    <input id='contact' type="text" placeholder='000 000 000' className='w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required/>
                </div>

                <div className='w-full mt-4'>
                    <label htmlFor='address' className='text-gray-500 font-medium'>Phone</label>
                    <input id='address' type="text" placeholder='000 000 000' className='w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required/>
                </div>

                <div className='w-full mt-4 max-w-60 mr-auto'>
                    <label htmlFor="city" className='font-medium text-gray-500'>City</label>
                    <select id="city" className='w-full p-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer' required>
                        <option>select city</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <button className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 mt-6 rounded cursor-pointer'>
                    Register
                </button>
            </div>
           </form>
        </div>
    );
};

export default HotelReg;