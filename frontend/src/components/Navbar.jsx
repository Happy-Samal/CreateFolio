import React from 'react'
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
  const [userdata, setUserdata] = useState({})
  const [dropdownHidden, setDropdownHidden] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const demoClicked = () => {
    navigate('/user/demo');
  }
  const loginClicked = () => {
    navigate('/login')
  }

  useEffect(() => {
  const isLogin = async () => {
    try {
      let response = await fetch(`${import.meta.env.VITE_API_URL}/isLogin`, { method: 'GET', credentials: 'include', })
      let data = await response.json()
      setUserdata(data)
    } catch (err) {
      console.log('Error in fetch user data',err)
      navigate('/error')
    }
  }
    isLogin()
  }, [])

  const logoutClicked = async()=>{
    window.location.href = `${import.meta.env.VITE_API_URL}/logout`;
  }

  const deleteClicked = async()=>{
    let cnf = confirm("Are you sure to delete your account ?? but your portfolio is safe.")
    if(cnf){
      window.location.href = `${import.meta.env.VITE_API_URL}/delete`;
    }
  }

  return (
    <>
      <div className={`navbar w-screen  h-32 sm:h-28 flex   justify-between sm:px-10  px-6 items-center  top-0 fixed z-40 transition-colors duration-700 ${scrollPosition > 60 ? 'bg-[#fcfcfc8f] ' : 'bg-transparent'} `}>

        {/* logo */}
        <NavLink className={`${scrollPosition > 60 ? 'text-black' : 'text-white'}`} to={'/'}>
          <p className='sm:text-[22px] text-[14px] font-semibold'>ᑕᖇEᗩTEᖴOᒪIO</p>
          <p className='sm:text-[12px] text-[6px]'>𝚖𝚊𝚔𝚎 𝚢𝚘𝚞𝚛 𝚙𝚘𝚛𝚝𝚘𝚏𝚘𝚕𝚒𝚘 𝚒𝚗 𝚜𝚎𝚌</p>
        </NavLink>

        <div className='flex gap-4 sm:flex-row flex-col'>
          {/* demo*/}
          <button className={`sm:px-7 sm:py-2.5 px-3.5 py-1.5 sm:text-base text-[12px] border  rounded-[50px]  grid place-content-center ${scrollPosition > 60 ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'} transition-colors duration-700 ease-in-out`} onClick={demoClicked}>
            Demo
          </button>
          {Object?.keys(userdata).length <= 0 &&
            <button className={`sm:px-9 sm:py-2.5 px-3.5 py-1.5 sm:text-base text-[12px] border rounded-[50px]  grid place-content-center  transition-colors duration-700 ease-in-out  ${scrollPosition > 60 ? 'border-black hover:text-black bg-black text-white hover:bg-white' : 'border-white hover:text-white hover:bg-black bg-white text-black'}`} onClick={loginClicked}>
              Log in</button>}
          {Object?.keys(userdata).length > 0 &&
            <div className='relative '>
            <button onClick={() => setDropdownHidden(!dropdownHidden)} onBlur={() => setTimeout(() => setDropdownHidden(true), 300)} className={`min-w-[116px] sm:min-w-[130px] hover:text-black rounded-[50px] border sm:px-5 sm:py-2.5 px-3.5 py-1.5 sm:text-base text-[12px] flex items-center justify-between gap-2 relative" type="button  ${scrollPosition > 60 ? 'border-black text-black  hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'} transition-colors duration-700 ease-in-out`}>
                <div className='sm:w-7 sm:h-7 w-4 h-4 overflow-hidden border rounded-full bg-black border-white'>
                    <img src={userdata.avatar ? userdata.avatar : '/avatar2.gif'} alt="user" className='sm:w-7 sm:h-7 w-4 h-4'  />
                </div>
                <span className='sm:max-w-[140px] max-w-[120px] text-ellipsis whitespace-nowrap overflow-hidden'>{userdata.username}</span>
                <span><img src="/downarrow.png" alt="arrow" className='w-[10px] h-[10px]' /></span>
            </button>

            <ul id="dropdown" className={`${dropdownHidden ? 'hidden' : ''} z-50 w-full absolute text-sm  text-center `}>
                <li>
                    <NavLink to={'/dashboard'} className={`block sm:px-4 sm:py-2 px-2 py-1 hover:-translate-x-7 rounded-[50px]  text-white hover:bg-white hover:text-black  transition-all duration-[800ms] ease-out shadow-[2px_4px_4px_rgba(0,0,0,0.8)]`}>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to={`/user/${userdata.username}`} className={`block sm:px-4 sm:py-2 px-2 py-1  hover:-translate-x-7 rounded-[50px]   text-white hover:bg-white hover:text-black  transition-all duration-[800ms] ease-out shadow-[2px_4px_4px_rgba(0,0,0,0.8)]`}>Your Portfolio</NavLink>
                </li>
                <li>
                    <button onClick={logoutClicked} className={`w-full block sm:px-4 sm:py-2 px-2 py-1  hover:-translate-x-7  rounded-[50px]  text-blue-600  hover:bg-white  transition-all duration-[800ms] ease-out shadow-[2px_4px_4px_rgba(0,0,0,0.8)]`}>Logout</button>
                </li>
                <li>
                    <button onClick={deleteClicked}  className={`w-full block sm:px-4 sm:py-2 px-2 py-1  hover:-translate-x-7 rounded-[50px]   text-red-600 hover:bg-white   transition-all duration-[800ms] ease-out shadow-[2px_4px_4px_rgba(0,0,0,0.8)]`} >Delete account</button>
                </li>
            </ul>
        </div>}

        </div>
      </div>
    </>
  )
}

export default Navbar
