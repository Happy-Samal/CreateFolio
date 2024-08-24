import React from 'react'
import {  NavLink } from 'react-router-dom';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <>
        
            <div className="bg-black h-[1px] w-full "></div>
            <div className='w-full bg-black text-white flex sm:justify-between p-4 sm:px-10 px-6 sm:flex-row flex-col sm:text-base text-[10px] sm:gap-0 gap-4 text-center'>
                <div className='flex gap-4 flex-col'>
                    <div>
                        <p>Copyright &copy; {currentYear}-{currentYear + 1} CREATEFOLIO | All rights reserved!</p>
                        <p>Made by Happy Samal with ❤</p>
                    </div>
                    <div className='flex gap-4 sm:justify-normal justify-center'>
                        < NavLink to={'/about'} className='hover:underline underline sm:no-underline'>About</ NavLink>
                        < NavLink to={'/contactUs'} className='hover:underline underline sm:no-underline'>Contact us</ NavLink>
                        < NavLink to={'/privacyPolicy'} className='hover:underline underline sm:no-underline'>Privacy Policy</ NavLink>
                        < NavLink to={'/termsCondition'} className='hover:underline underline sm:no-underline'>Terms & Conditions</ NavLink>
                    </div>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <span>Follow Me On</span>
                    <div className='flex gap-4'>
                        <a href="https://www.instagram.com/rudrasamal_/" target="_blank" rel="noopener noreferrer">
                            <img src="/insta.gif" alt="insta" className='w-[25px] h-[25px]' />
                        </a>
                        <a href="https://www.facebook.com/samalrudra.rudra" target="_blank" rel="noopener noreferrer">
                            <img src="/facebook.gif" alt="facebook" className='w-[25px] h-[25px]' />
                        </a>
                        <a href="https://www.linkedin.com/in/happy-samal" target="_blank" rel="noopener noreferrer">
                            <img src="/linkedin.gif" alt="linkedin" className='w-[25px] h-[25px]' />
                        </a>
                        <a href="https://github.com/Happy-Samal" target="_blank" rel="noopener noreferrer">
                            <img src="/github.gif" alt="github" className='w-[25px] h-[25px]' />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer

