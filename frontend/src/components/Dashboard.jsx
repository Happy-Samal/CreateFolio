import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { NavLink, useNavigate } from 'react-router-dom';
import Home from './Home';
function Dashboard() {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const getUserData = async () => {
      try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/isLogin`, { method: 'GET', credentials: 'include', })
        let data = await response.json()
        setUserInfo(data)
      } catch (err) {
        console.log('Error in fetch user data ',err)
        navigate('/error')
      }
    }
    getUserData()
  }, [])

  console.log(userInfo)
  if (Object.keys(userInfo).length <= 0) {
    console.log("navigate to login",userInfo)
    navigate('/login')
  }

  return (
    <>
      <Helmet>
        <title>CreateFolio - my dashboard </title>
        <meta name="description" content="CreateFolio - provide a platform where you make your portfolio in second" />
      </Helmet>
      <Home />
      <div className='fixed z-20 top-0 w-screen flex justify-center min-h-screen '>
        <div className=" text-white flex flex-col min-h-[70vh] sm:min-h-[65vh] w-full sm:w-[50vw] bg-black bg-opacity-20 backdrop-blur-[3px] absolute top-40 px-20 py-10 rounded-2xl border gap-10 items-center text-center sm:text-left">
          <div>
          <p className='sm:text-[22px] text-[14px] font-semibold'>Welcome to ᑕᖇEᗩTEᖴOᒪIO</p>
          <p className='sm:text-[12px] text-[6px]'>𝚖𝚊𝚔𝚎 𝚢𝚘𝚞𝚛 𝚙𝚘𝚛𝚝𝚘𝚏𝚘𝚕𝚒𝚘 𝚒𝚗 𝚜𝚎𝚌</p>
          </div>
          <div className='flex flex-col text-center items-center'>
          <div className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full overflow-hidden bg-black border-white border-2">
            <img src={userInfo.avatar ? userInfo.avatar : '/avatar1.gif'} alt="profile" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full" />
          </div>
          <span>{userInfo.displayname}</span>
          </div>
          <div className='flex flex-col gap-5'>
            <span><span className='font-[500]'>Email</span> : {userInfo.email}</span>
            <span><span className='font-[500]'>User Name</span> : {userInfo.username}</span>
            <span className='font-[500]'>Portfolio Link : <NavLink to={`/user/${userInfo.username}`}><span className='underline text-blue-400 cursor-pointer'>`${import.meta.env.VITE_API_URL}/${userInfo.username}`</span></NavLink></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
