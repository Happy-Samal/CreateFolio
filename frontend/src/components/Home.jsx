import React, { useRef, useEffect } from 'react';
import {NavLink,useNavigate} from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  
  const getStartedClick =()=>{
    navigate('/login')
  }
  return (
    <div className='relative overflow-hidden'>
      {/* bg video */}
      <div className="min-h-screen relative ">
        <video src="/video1.mp4" autoPlay loop muted className="absolute w-full h-full object-cover" ></video>
      </div>
      {/* moving logo name */}
      <div className='absolute z-10 top-80'>
        <img src="/movinglogo.svg" alt="porto" />
        <img src="/movinglogo2.svg" alt="slog" />
      </div>
      {/* getstarted 1 */}
      <div className='bg-[#d3e5fe] w-screen cmd:h-[100vh] h-[50vh] flex relative justify-between gap-10 '>
        <div className=' w-1/2 cmd:py-24 py-10 h-full cmd:px-20 px-2 flex flex-col cmd:gap-8 gap-4'>
          <h1 className='text-black cmd:text-[42px] text-[15px] font-[500]'>Showcase your work with an online portfolio</h1>
          <h6 className='cmd:text-[20px] text-[6px] text-[#151515]'>Create your standout portfolio in seconds with our intuitive design features and powerful marketing tools—your complete solution to shine online.</h6>
          <button className={`cmd:px-9 cmd:py-2.5 px-2 py-1 sm:text-base text-[10px] border rounded-[50px]  grid place-content-center w-[90px] sm:w-[200px] hover:bg-white hover:text-black transition-colors duration-700 ease-in-out bg-black `} onClick={getStartedClick}>Get Started</button>
        </div>
        <div className='w-1/2 h-full'>
          <img src="/getstartedimg.webp" alt="getstartedimg"  className='h-full'/>
        </div>
      </div>
      {/* faq */}
      <div className='bg-white min-h-[60vh] cmd:min-h-[80vh] w-screen  flex flex-col  py-20 items-center text-black gap-10'>
          <h5 className='md:text-[34px] text-[22px] font-[700]'>Online portfolio FAQ</h5>
          <div className='flex flex-col gap-10 justify-center items-center relative w-full'>
              {/* q1 */}
              <div className='flex flex-col h-[40px] cmd:h-[50px] gap-5 cursor-pointer w-[80%] cmd:w-[60%] overflow-hidden hover:h-[170px] transition-all duration-500 ease-in-out border-b border-[#b0b0b0]' >
                <div className='flex justify-between items-center'>
                <span className='md:text-[24px] text-[12px] font-[500]'>What are the benefits of having portfolio? </span>
                <img src="/downarrow.png" alt="downarrow" className='invert filter h-3 w-3 cmd:h-6 cmd:w-6' />
                </div>
                <span className='text-[10px] sm:text-base'>Creating an online portfolio is one of the best ways to show off your best work, all in one place. Even if you’re already using different social media accounts, putting your portfolio online gives you an online hub for potential clients, customers, agencies, and recruiters to see what you can do. It’s all on a platform you control, no matter how social media trends change. Plus, you can customize your design exactly how you want it.</span>
              </div>
              {/* q2 */}
              <div className='flex flex-col h-[40px] cmd:h-[50px] gap-5 cursor-pointer w-[80%] cmd:w-[60%]  overflow-hidden hover:h-[170px] transition-all duration-500 ease-in-out border-b border-[#b0b0b0]' >
                <div className='flex justify-between items-center'>
                <span className='md:text-[24px] text-[12px] font-[500]'>How do I make a good portfolio website? </span>
                <img src="/downarrow.png" alt="downarrow" className='invert filter h-3 w-3 cmd:h-6 cmd:w-6' />
                </div>
                <span className='text-[10px] sm:text-base'>Fortunately with Jimdo, most of the portfolio creation is already done for you! The best way to create a good online portfolio is to start with a custom domain. That shows the world that you take your project seriously and professionally. Once you put your portfolio online, make sure you use high-quality images, and choose a high-impact image for the header of your homepage to grab people’s attention.  That way, your portfolio will start showing up in search engines for the right audience.</span>
              </div>
              {/* q3 */}
              <div className='flex flex-col h-[40px] cmd:h-[50px] gap-5 cursor-pointer w-[80%] cmd:w-[60%] overflow-hidden hover:h-[170px] transition-all duration-500 ease-in-out border-b border-[#b0b0b0]' >
                <div className='flex justify-between items-center'>
                <span className='md:text-[24px] text-[12px] font-[500]'>What should I put in my online portfolio?</span>
                <img src="/downarrow.png" alt="downarrow" className='invert filter h-3 w-3 cmd:h-6 cmd:w-6' />
                </div>
                <span className='text-[10px] sm:text-base'>A good portfolio website doesn’t have to be complicated. It’s a good idea to include a short bio and headshot on your About page, as well as any relevant skills or experience. Then, you can have some fun putting together the visuals on your site, either in a slide show or just by placing the images on your web pages. When you do this, try to choose just your best work. Don’t post everything you’ve ever done—be picky and keep in mind that many online visitors have short attention spans.</span>
              </div>
              {/* q4 */}
              <div className='flex flex-col h-[40px] cmd:h-[50px] gap-5 cursor-pointer w-[80%] cmd:w-[60%]  overflow-hidden hover:h-[170px] transition-all duration-500 ease-in-out border-b border-[#b0b0b0]' >
                <div className='flex justify-between items-center'>
                <span className='md:text-[24px] text-[12px] font-[500]'>How do I choose the right design for my portfolio website?</span>
                <img src="/downarrow.png" alt="downarrow" className='invert filter h-3 w-3 cmd:h-6 cmd:w-6' />
                </div>
                <span className='text-[10px] sm:text-base'>The best portfolio website designs and templates are clean, modern, and show off your work without distractions. When you sign up for Jimdo, you’ll be able to pick a style that fits you, and then the design of the website is taken care of! Once you create your online portfolio, you can tweak it and customize it as you like, but all the heavy lifting is done for you. So you can spend more time on your actual work, and less time laboring over your website.</span>
              </div>
              {/* q5*/}
              <div className='flex flex-col h-[40px] cmd:h-[50px] gap-5 cursor-pointer w-[80%] cmd:w-[60%]  overflow-hidden hover:h-[170px] transition-all duration-500 ease-in-out border-b border-[#b0b0b0]' >
                <div className='flex justify-between items-center'>
                <span className='md:text-[24px] text-[12px] font-[500]'>Why is an online portfolio important for a student?</span>
                <img src="/downarrow.png" alt="downarrow" className='invert filter h-3 w-3 cmd:h-6 cmd:w-6' />
                </div>
                <span className='text-[10px] sm:text-base'>Showcases Skills and Projects: An online portfolio allows students to present their academic projects, personal work, and any relevant experiences. It provides a platform to highlight what they've learned and accomplished, which is especially valuable when they have limited professional experience and Enhances Employability: In a competitive job market, an online portfolio can set a student apart from other candidates.</span>
              </div>
          </div>
      </div>
      {/* getstarted 2 */}
      <div className='bg-black w-screen sm:h-[50vh] h-[30vh] text-white flex flex-col justify-center items-center gap-6'>
        <h1 className='text-[18px] sm:text-[35px] font-[500] w-[300px] sm:w-[600px] text-center'>Show the world what you do best. Create your online portfolio today.</h1>
        <button className={`sm:px-9 sm:py-2.5 px-2 py-1 sm:text-base text-[10px] border rounded-[50px]  grid place-content-center w-[90px] sm:w-[200px] hover:bg-black hover:text-white transition-colors duration-700 ease-in-out bg-white text-black `} onClick={getStartedClick}>Get Started</button>
      </div>
    </div>
  );
}
export default Home;
