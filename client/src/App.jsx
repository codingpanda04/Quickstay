import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails';
import { useClerk, useUser } from '@clerk/clerk-react';
import MyBookings from './pages/MyBookings';
import Error404 from './components/Error404';
import HotelReg from './components/HotelReg';

const App = () => {
  const user = useUser()
  const {openSignIn} = useClerk();
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <div>
      {! isOwnerPath && <Navbar/>}
      {false && <HotelReg />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<AllRooms/>} />
          <Route path='/rooms/:id' element={<RoomDetails/>} />
          {user && <Route path='/my-bookings' element={<MyBookings/>}/>}
          <Route path='/my-bookings' element={<Error404/>}/>
          <Route path='*' element={<Error404/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
};

export default App