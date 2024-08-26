import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Map from './Map';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";

function User() {
  const { username } = useParams();
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false); // New state for triggering updates


  useEffect(() => {
    const isuserLogin = async () => {
      try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/isLogin`, { method: 'GET', credentials: 'include', })
        let data = await response.json()
        if (data.username === username) {
          setIsLogin(true)
        }
      } catch (err) {
        console.log('Error in fetch user data', err)
        navigate('/error')
      }
    }
    isuserLogin()
  }, [])


  const [userPortfolio, setUserPortfolio] = useState({})
  useEffect(() => {
    const getUserPortfolio = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        let data = { username: username }
        let response = await fetch(`${import.meta.env.VITE_API_URL}/userPortfolio`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        let portfolio = await response.json()
        setUserPortfolio(portfolio)
        setUpdateTrigger(false)
      } catch (err) {
        console.log('Error in fetch user data', err)
        navigate('/error')
      }finally {
        setIsLoading(false); // Set loading state to false
      }
    }
    if(username !== 'demo'){
      getUserPortfolio()
    }
  }, [updateTrigger])

  const [istop, setIstop] = useState(false)
  const dpRef = useRef()
  const siteRef = useRef()
  const [hoveredId, setHoveredId] = useState(null);
  const [expanded, setExapnded] = useState(false)
  const homeRef = useRef()
  const aboutRef = useRef()
  const projectRef = useRef()
  const contactRef = useRef()
  const skillRef = useRef()
  const resumeRef = useRef()
  const [activeBtn, setActiveBtn] = useState('home')
  const refMap = {
    home: homeRef,
    about: aboutRef,
    project: projectRef,
    contact: contactRef,
    skill: skillRef,
    resume: resumeRef
  };
  const navBtnClick = (e) => {
    let refo = refMap[e.target.name]
    setActiveBtn(e.target.name)
    window.scrollTo({
      top: refo.current.getBoundingClientRect().top - 90 + window.scrollY,
      behavior: "smooth"
    });
  }
  const btnColor = (value) => {
    return activeBtn === value ? 'text-red-500' : 'text-black';
  }

  useEffect(() => {
    const handleDP = () => {
      if (dpRef.current) {
        const position = dpRef.current.getBoundingClientRect();
        if (position.top <= 65) {
          setIstop(true);
        } else {
          setIstop(false);
        }

      }
    }
    window.addEventListener('scroll', handleDP);
    return () => {
      window.removeEventListener('scroll', handleDP);
    };
  }, [])


  const update = async (updates) => {
    console.log(updates)
    try {
      let data = {
        username: username,
        updates:updates
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/updatePortfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setTimeout(() => {
        toast(result.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }, 2000);
      setUpdateTrigger(true);
    } catch (err) {
      console.log('Error in fetch user data', err);
      toast.error('Error updating user info. Please try again.');
      navigate('/error');
    }
  }

  // userInfo input
  const userInfoInput = useRef()
  const [userInfoForm, setuserInfoForm] = useState({ greet: '', name: '', udesc: '' })

  const userInfoChange = (e) => {
    setuserInfoForm({ ...userInfoForm, [e.target.name]: e.target.value })
  }
  const userInfoSave = () => {
    userInfoInput.current.style.display = 'none'
    update({userInfo:userInfoForm})
  }

  // whoiam input
  const whoiamInput = useRef()
  const [whoiamForm, setwhoiamForm] = useState({ about: '', wdesc: '' })

  const whoiamChange = (e) => {
    setwhoiamForm({ ...whoiamForm, [e.target.name]: e.target.value })
  }
  const whoiamSave =() => {
    whoiamInput.current.style.display = 'none'
    update({whoiam:whoiamForm})
  }
  // personalInfo input
  const personalInput = useRef()
  const [personalForm, setpersonalForm] = useState({ birth: '', email: '', phone: '', address: '', github: '', facebook: '', instagram: '', linkedin: '' })

  const personalChange = (e) => {
    setpersonalForm({ ...personalForm, [e.target.name]: e.target.value })
  }
  const personalSave = async () => {
    personalInput.current.style.display = 'none'
    update({personalInfo:personalForm})
  }

  // expertise input
  const expertiseInput = useRef()
  const [expertiseForm, setexpertiseForm] = useState({ main: '', sub: '' })
  const [expertiseArr, setexpertiseArr] = useState([])

  const expertiseChange = (e) => {
    setexpertiseForm({ ...expertiseForm, [e.target.name]: e.target.value })
  }
  const expertiseAddClicked = () => {
    setexpertiseArr([...expertiseArr, expertiseForm]);
    setexpertiseForm({ main: '', sub: '' });
  }
  const expertiseSave = async () => {
    expertiseInput.current.style.display = 'none'
    setexpertiseArr([])
    setexpertiseForm({ main: '', sub: '' });
    update({expertise:[...expertiseArr, expertiseForm]})
  }
  // skill input
  const skillInput = useRef()
  const [skillForm, setskillForm] = useState({ slang: '', spercentage: '' })
  const [skillArr, setskillArr] = useState([])

  const skillChange = (e) => {
    setskillForm({ ...skillForm, [e.target.name]: e.target.value })
  }
  const skillAddClicked = () => {
    setskillArr([...skillArr, skillForm]);
    setskillForm({ slang: '', spercentage: '' });
  }
  const skillSave = async () => {
    skillInput.current.style.display = 'none'
    setskillArr([])
    setskillForm({ slang: '', spercentage: '' });
    update({skill:[...skillArr, skillForm]})
  }

  // Language input
  const languageInput = useRef()
  const [languageForm, setlanguageForm] = useState({ llang: '', lpercentage: '' })
  const [languageArr, setlanguageArr] = useState([])

  const languageChange = (e) => {
    setlanguageForm({ ...languageForm, [e.target.name]: e.target.value })
  }
  const languageAddClicked = () => {
    setlanguageArr([...languageArr, languageForm]);
    setlanguageForm({ llang: '', lpercentage: '' });
  }
  const languageSave = async () => {
    languageInput.current.style.display = 'none'
    setlanguageArr([])
    setlanguageForm({ llang: '', lpercentage: '' });
    update({language:[...languageArr, languageForm]})
  }

  // images
  const imageInput = useRef()
  const [message, setMessage] = useState('');
  const [imageForm, setimageForm] = useState({ cover: '', profile: '', resume: '' })
  const imageChange = (e) => {
    setMessage('')
    const file = e.target.files[0]

    if (file.size > 1048576) {
      setMessage('File size exceeds 1MB.');
      return;
    }
    // Create a FileReader to read the file as Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      setimageForm({ ...imageForm, [e.target.name]: base64Data })
    };

    // Read the file as a Data URL (Base64)
    reader.readAsDataURL(file);
  }
  const imageSave = async () => {
    imageInput.current.style.display = 'none'
    update({images:imageForm})
  }

  // project input
  const projectInput = useRef()
  const pimageInput = useRef();
  const [projectForm, setProjectForm] = useState({ pname: '', puse: '', plink: '', pimage: '' })
  const [projectArr, setprojectArr] = useState([])

  const projectChange = (e) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value })
  }
  // pimage input
  const pimageChange = (e) => {
    setMessage('')
    const file = e.target.files[0]

    if (file.size > 1048576) {
      setMessage('File size exceeds 1MB.');
      return;
    }
    // Create a FileReader to read the file as Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      setProjectForm({ ...projectForm, [e.target.name]: base64Data })
    };
    // Read the file as a Data URL (Base64)
    reader.readAsDataURL(file);
  }

  const projectAddClicked = () => {
    setprojectArr([...projectArr, projectForm])
    setProjectForm({ pname: '', puse: '', plink: '', pimage: '' })

    // Reset the file input
    if (pimageInput.current) {
      pimageInput.current.value = ''; // Clear the file input value
    }
  }
  const projectSave = async () => {
    projectInput.current.style.display = 'none'
    setlanguageArr([])
    setProjectForm({ pname: '', puse: '', plink: '', pimage: '' })
    update({project:[...projectArr, projectForm]})
  }

  // email send

  const [sendemailForm, setsendemailForm] = useState({ sendername: '', senderemail: '', sendermessage: '' })

  const sendemailChange = (e) => {
    setsendemailForm({ ...sendemailForm, [e.target.name]: e.target.value })
  }

  emailjs.init(import.meta.env.VITE_PUBLIC_KEY);  //"YOUR_PUBLIC_KEY"

  const sendemailSubmit = async (e) => {
    e.preventDefault();
    setsendemailForm({ sendername: '', senderemail: '', sendermessage: '' })

    const templateParams = {
      receiver_name: userPortfolio?.userInfo?.name,
      receiver_email: userPortfolio?.personalInfo?.email,
      sender_name: sendemailForm.sendername,
      sender_email: sendemailForm.senderemail,
      message: sendemailForm.sendermessage,
    };

    try {
      const response = await emailjs.send(import.meta.env.VITE_SERVICE_KEY, import.meta.env.VITE_TEMPLATE_KEY, templateParams);
      console.log('SUCCESS!', response.status, response.text);
      toast('Email sent successfully!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error('FAILED...', error);
      toast.error('Failed to send email. Please try again.');
    }

  }

 // Loading UI
 if (isLoading) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="text-white text-2xl flex items-center">Loading</div>
      <span className="dot-animation">.</span>
      <span className="dot-animation">.</span>
      <span className="dot-animation">.</span>
    </div>
  );
}
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Helmet>
        <title>{username}'s Portfolio</title>
        <meta name="description" content="CreateFolio - provide a platform where you make your portfolio in second" />
      </Helmet>

      {/* bg image */}
      <div className='w-screen cmd:min-h-[83vh] min-h-[65vh] fixed bg-black'>
        <img src={userPortfolio?.images?.cover || "/johnbg.jpg"} alt="bg" className=' absolute inset-0 object-cover w-full h-full opacity-60' />
      </div>

      {/* Absolute div */}
      <div className='absolute z-10 text-black w-screen'>

        {/* heading name on over the image */}
        {/* edit img */}
        {isLogin && <img src="/addimg.png" alt="addimg" className='h-8 w-8 sm:h-[60px] sm:w-[60px] filter invert absolute sm:right-[20vw] right-20 sm:top-30 top-80 cursor-pointer' onClick={() => { imageInput.current.style.display = 'flex' }} />}
        <div className='pt-4 flex flex-col cmd:gap-40 gap-32 cmd:pl-[40px] cmd:min-h-[83vh] min-h-[65vh]' ref={homeRef}>
          <ul className='flex cmd:gap-4 gap-2 justify-center items-center cmd:justify-start'>
            <li><a href={userPortfolio?.personalInfo?.github || '#'}><img src="/demogit.gif" alt="github" className='w-6 h-6 ' /></a></li>
            <li><a href={userPortfolio?.personalInfo?.facebook || '#'}><img src="/demofab.gif" alt="facebook" className='w-6 h-6 ' /></a></li>
            <li><a href={userPortfolio?.personalInfo?.instagram || '#'}><img src="/demoinsta.gif" alt="insta" className='w-6 h-6 ' /></a></li>
            <li><a href={userPortfolio?.personalInfo?.linkedin || '#'}><img src="/demolink.gif" alt="linkedin" className='w-6 h-6 ' /></a></li>
          </ul>
          <div className='flex flex-col text-[#dedddd] cmd:pl-0 pl-[15px]'>
            {/* edit */}
            {isLogin && <img src="/edit.gif" alt="edit" className='w-5 h-5 filter invert cursor-pointer' onClick={() => { userInfoInput.current.style.display = 'flex' }} />}

            <h4 className='cmd:text-[24px] text-[18px] font-[500] '>{userPortfolio?.userInfo?.greet || 'Hello, I am'}</h4>
            <h1 className='cmd:text-[60px] text-[30px] font-[600] pl-[10px]'>{userPortfolio?.userInfo?.name || 'John Snow'}</h1>
            <h6 className='cmd:text-[17px] text-[13px] '>{userPortfolio?.userInfo?.udesc || 'King of North and Queen Slayer'}</h6>
          </div>
        </div>

        <div className='bg-white cmd:min-h-[490vh] min-h-[810vh]'>

          {/* navbar */}
          <div className={`cmd:h-20 cmd:px-32 px-4 flex border-b-2 bg-white shadow-[2px_4px_4px_rgba(0,0,0,0.2)] cmd:items-center justify-between sticky top-0 z-50 py-2 cmd:py-0 overflow-hidden cmd:overflow-visible transition-all duration-500 ease-in-out  ${expanded ? 'h-64' : 'h-14'}`} >

            {/*Mobile navbar*/}
            <div className='py-12 cmd:hidden'>
              <div className='flex flex-col cmd:flex-row gap-2  font-semibold'>
                <button onClick={(e) => { navBtnClick(e) }} name='home' className={btnColor('home')}>Home</button>
                <button onClick={(e) => { navBtnClick(e) }} name='about' className={btnColor('about')}>About</button>
                <button onClick={(e) => { navBtnClick(e) }} name='project' className={btnColor('project')}>Projects</button>
                <button onClick={(e) => { navBtnClick(e) }} name='skill' className={btnColor('skill')}>Skills</button>
                <button onClick={(e) => { navBtnClick(e) }} name='contact' className={btnColor('contact')}>Contact</button>
                <button onClick={(e) => { navBtnClick(e) }} name='resume' className={btnColor('resume')}>Resume</button>
              </div>
            </div>
            <button className={` border px-1  bg-white shadow-[2px_4px_4px_rgba(0,0,0,0.4)] rounded-md cmd:hidden ${expanded ? 'border-[#f76276] border-2' : 'border-transparent border-2 transition-all duration-500 ease-in-out'}`} onClick={() => { setExapnded(!expanded) }}> <img src="/expandbar.svg" alt="expandbar" className='w-8' /></button>

            {/* Desktop navbar*/}
            <div className='gap-8 text-lg font-semibold hidden cmd:flex'>
              <button onClick={(e) => { navBtnClick(e) }} name='home' className={btnColor('home')}>Home</button>
              <button onClick={(e) => { navBtnClick(e) }} name='about' className={btnColor('about')}>About</button>
              <button onClick={(e) => { navBtnClick(e) }} name='project' className={btnColor('project')}>Projects</button>
            </div>
            <div className={`cmd:flex w-[170px] h-[170px] rounded-full  justify-center items-center overflow-hidden border-[10px] border-white   absolute  left-[44%]  ${istop ? 'cstminvisible' : 'cstmvisible'} shadow-[2px_4px_4px_rgba(0,0,0,0.7)]  hidden`} ref={dpRef}>
              <img src={userPortfolio?.images?.profile || "/johndp.webp"} alt="dp" className='w-[170px] h-[170px] inset-0 object-cover ' />
            </div>
            <div className={`cmd:flex flex-col min-w-[180px] h-full items-center top-[40px]  ${istop ? 'cvisible' : 'invisible'} absolute left-[44%]  gap-[2px] hidden`}>
              <span className='text-xl font-[400]'>{userPortfolio?.userInfo?.name || 'John Snow'}</span>
              <span className='text-[14px] text-[#616161] font-[400]'>{userPortfolio?.userInfo?.udesc || 'King of North and Queen Slayer'}</span>
            </div>
            <div className='cmd:flex gap-8 text-lg font-semibold hidden'>
              <button onClick={(e) => { navBtnClick(e) }} name='skill' className={btnColor('skill')}>Skills</button>
              <button onClick={(e) => { navBtnClick(e) }} name='contact' className={btnColor('contact')}>Contact</button>
              <button onClick={(e) => { navBtnClick(e) }} name='resume' className={btnColor('resume')}>Resume</button>
            </div>
          </div>

          {/* about section*/}
          <div className='flex flex-col cmd:flex-row border border-b-[#b1b1b1] cmd:min-h-[62vh]' ref={aboutRef}>
            <div className='flex cmd:gap-10 gap-5 flex-col border border-r-[#b1b1b1] w-full cmd:w-1/3 px-12  cmd:py-20 py-8'>
              <div className='flex gap-3 items-center'>
                <h3 className='text-[28px] font-[400]'>Who I am</h3>
                {/* edit */}
                {isLogin && <img src="/edit.gif" alt="edit" className='w-5 h-5 cursor-pointer' onClick={() => { whoiamInput.current.style.display = 'flex' }} />}

              </div>
              <div className='flex flex-col gap-4'>
                <span className='text-[20px] font-[400]'>{userPortfolio?.whoiam?.about || 'King of North and Queen Slayer'}</span>
                <p className='text-[14px]'>{userPortfolio?.whoiam?.wdesc || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.sit amet, Qui deserunt consequatur fugit repellendusillo voluptas?Lorem ?'}</p>
              </div>
              <div className='border border-black rounded-2xl px-3 py-1 w-48 shadow-[2px_4px_4px_rgba(0,0,0,0.8)]'>
                <a href={userPortfolio?.images?.resume || '/HappySamalResume.pdf'} download={userPortfolio?.username + ".pdf" || 'demo.pdf'}>Download My Resume</a>
              </div>
            </div>
            <div className='flex cmd:gap-10 gap-5 flex-col border border-r-[#b1b1b1] cmd:w-1/3  w-full px-12 cmd:py-20 py-8'>
              <div className='flex gap-3 items-center'>
                <h3 className='text-[28px] font-[400]'>Personal Info</h3>
                {/* edit */}
                {isLogin && <img src="/edit.gif" alt="edit" className='w-5 h-5 cursor-pointer' onClick={() => { personalInput.current.style.display = 'flex' }} />}
              </div>
              <div className='flex flex-col gap-2'>
                <span><span className='font-[500]'>Birthdate</span> : {userPortfolio?.personalInfo?.birth || '19/04/1108'}</span>
                <span><span className='font-[500]'>Email</span> : {userPortfolio?.personalInfo?.email || 'bastard@gmail.com'}</span>
                <span><span className='font-[500]'>Phone</span>: {userPortfolio?.personalInfo?.phone || '(123) 456-7890'}</span>
                <span><span className='font-[500]'>Address</span>: {userPortfolio?.personalInfo?.address || 'Winterfell  North Kingdom'}</span>
              </div>
              <ul className='flex gap-4'>
                <li><a href={userPortfolio?.personalInfo?.github || '#'}><img src="/demogit.gif" alt="github" className='w-6 h-6 filter invert' /></a></li>
                <li><a href={userPortfolio?.personalInfo?.facebook || '#'}><img src="/demofab.gif" alt="facebook" className='w-6 h-6 filter invert' /></a></li>
                <li><a href={userPortfolio?.personalInfo?.instagram || '#'}><img src="/demoinsta.gif" alt="insta" className='w-6 h-6 filter invert' /></a></li>
                <li><a href={userPortfolio?.personalInfo?.linkedin || '#'}><img src="/demolink.gif" alt="linkedin" className='w-6 h-6 filter invert' /></a></li>
              </ul>
            </div>
            <div className='flex cmd:gap-10 gap-5 flex-col border border-r-[#b1b1b1] cmd:w-1/3 w-full px-12 cmd:py-20 py-8'>
              <div className='flex gap-3 items-center'>
                <h3 className='text-[28px] font-[400]'>My Expertise</h3>
                {/* edit */}
                {isLogin && <img src="/edit.gif" alt="edit" className='w-5 h-5 cursor-pointer' onClick={() => { expertiseInput.current.style.display = 'flex' }} />}
              </div>
              <div className='flex flex-col gap-4'>
                {userPortfolio?.expertise ? userPortfolio?.expertise?.map((item) => {
                  return <div key={item._id}>
                    <span className='text-[20px] font-[400]'>{item.main}</span>
                    <p className='text-[14px]'>{item.sub}</p>
                  </div>
                }) : <><div>
                  <span className='text-[20px] font-[400]'>UX Design</span>
                  <p className='text-[14px]'>exercitat Repellendus, corrupt.</p>
                </div>
                  <div>
                    <span className='text-[20px] font-[400]'>Web Development</span>
                    <p className='text-[14px]'>Lorem ipsum dolor sit consectetur.</p>
                  </div>
                  <div>
                    <span className='text-[20px] font-[400]'>Digital Marketing</span>
                    <p className='text-[14px]'>voluptate commodi illo voluptatib.</p>
                  </div></>}

              </div>
            </div>
          </div>

          {/* Project section */}
          <div className='cmd:mt-20 mt-8 gap-12 flex flex-col items-center' ref={projectRef}>
            <div className='flex gap-3 items-center'>
              <h2 className='cmd:text-[34px] text-[28px] font-[400] '>My projects</h2>
              {/* edit */}
              {isLogin && <img src="/edit.gif" alt="edit" className='w-5 h-5 cursor-pointer' onClick={() => { projectInput.current.style.display = 'flex' }} />}
            </div>
            <div className='flex flex-wrap justify-center gap-10'>

              {userPortfolio?.project ? userPortfolio?.project?.map((item) => {
                return <div key={item._id} className=' w-[280px] cmd:w-[370px] h-[320px] border shadow-[2px_4px_4px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden relative hover:cursor-pointer' onMouseOver={() => { setHoveredId(item._id) }} onMouseLeave={() => setHoveredId(null)}>

                  <div className={`absolute left-[22%]  cmd:left-[28%] px-6 py-1.5  bg-[#090909] border-2 border-white text-gray-500 hover:text-white rounded-3xl ${hoveredId === item._id ? 'sitevisible' : 'sitehidden'}`} ref={siteRef}> <a href={item.plink}>View on Site &rarr;</a></div>
                  <img src={item.pimage} alt={item.pname} className='w-[280px] cmd:w-[370px] h-[210px]' />
                  <div className='bg-[#ffffff] px-2 text-[14px] py-2'>
                    <p><span className='font-[500]'>Name :</span> {item.pname} </p>
                    <p><span className='font-[500]'>Use</span> : {item.puse}</p>
                  </div>
                </div>
              }) : <>
                <div className=' w-[280px] cmd:w-[370px] h-[320px] border shadow-[2px_4px_4px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden relative hover:cursor-pointer' onMouseOver={() => { setHoveredId('1') }} onMouseLeave={() => setHoveredId(null)}>

                  <div className={`absolute left-[22%]  cmd:left-[28%] px-6 py-1.5  bg-[#090909] border-2 border-white text-gray-500 hover:text-white rounded-3xl ${hoveredId == '1' ? 'sitevisible' : 'sitehidden'}`} ref={siteRef}> <a href="https://need-money.vercel.app/">View on Site &rarr;</a></div>

                  <img src="/needmoney.png" alt="need" className='w-[280px] cmd:w-[370px] h-[210px]' />
                  <div className='bg-[#ffffff] px-2 text-[14px] py-2'>
                    <p><span className='font-[500]'>Name :  </span>Need Money - Used for help your friend and favorite cretor</p>
                    <p><span className='font-[500]'>Use</span> : NextJS , Mongoose , Tailwind CSS , Next-auth js , RazorPay</p>
                  </div>
                </div>
                <div className=' w-[280px] cmd:w-[370px] h-[320px] border shadow-[2px_4px_4px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden relative hover:cursor-pointer' onMouseOver={() => { setHoveredId('2') }} onMouseLeave={() => setHoveredId(null)}>

                  <div className={`absolute left-[22%]  cmd:left-[28%] px-6 py-1.5  bg-[#090909] border-2 border-white text-gray-500 hover:text-white rounded-3xl ${hoveredId == '2' ? 'sitevisible' : 'sitehidden'}`} ref={siteRef}> <a href="https://need-money.vercel.app/">View on Site &rarr;</a></div>

                  <img src="/needmoney.png" alt="need" className='w-[280px] cmd:w-[370px] h-[210px]' />
                  <div className='bg-[#ffffff] px-2 text-[14px] py-2'>
                    <p><span className='font-[500]'>Name :  </span>Need Money - Used for help your friend and favorite cretor</p>
                    <p><span className='font-[500]'>Use</span> : NextJS , Mongoose , Tailwind CSS , Next-auth js , RazorPay</p>
                  </div>
                </div>
                <div className=' w-[280px] cmd:w-[370px] h-[320px] border shadow-[2px_4px_4px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden relative hover:cursor-pointer' onMouseOver={() => { setHoveredId('3') }} onMouseLeave={() => setHoveredId(null)}>

                  <div className={`absolute left-[22%]  cmd:left-[28%] px-6 py-1.5  bg-[#090909] border-2 border-white text-gray-500 hover:text-white rounded-3xl ${hoveredId == '3' ? 'sitevisible' : 'sitehidden'}`} ref={siteRef}> <a href="https://need-money.vercel.app/">View on Site &rarr;</a></div>

                  <img src="/needmoney.png" alt="need" className='w-[280px] cmd:w-[370px] h-[210px]' />
                  <div className='bg-[#ffffff] px-2 text-[14px] py-2'>
                    <p><span className='font-[500]'>Name :  </span>Need Money - Used for help your friend and favorite cretor</p>
                    <p><span className='font-[500]'>Use</span> : NextJS , Mongoose , Tailwind CSS , Next-auth js , RazorPay</p>
                  </div>
                </div>
                <div className=' w-[280px] cmd:w-[370px] h-[320px] border shadow-[2px_4px_4px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden relative hover:cursor-pointer' onMouseOver={() => { setHoveredId('4') }} onMouseLeave={() => setHoveredId(null)}>

                  <div className={`absolute left-[22%]  cmd:left-[28%] px-6 py-1.5  bg-[#090909] border-2 border-white text-gray-500 hover:text-white rounded-3xl ${hoveredId == '4' ? 'sitevisible' : 'sitehidden'}`} ref={siteRef}> <a href="https://need-money.vercel.app/">View on Site &rarr;</a></div>

                  <img src="/needmoney.png" alt="need" className='w-[280px] cmd:w-[370px] h-[210px]' />
                  <div className='bg-[#ffffff] px-2 text-[14px] py-2'>
                    <p><span className='font-[500]'>Name :  </span>Need Money - Used for help your friend and favorite cretor</p>
                    <p><span className='font-[500]'>Use</span> : NextJS , Mongoose , Tailwind CSS , Next-auth js , RazorPay</p>
                  </div>
                </div>
              </>}
            </div>
          </div>

          {/* skills */}
          <div className='mt-20  flex flex-wrap justify-center gap-10' ref={skillRef}>
            <div className='flex flex-col gap-4 cmd:min-h-[70vh]'>
              <div className='flex gap-3 items-center'>
                <h2 className='cmd:text-[34px] text-[28px] font-[400] '>Skills</h2>
                {/* edit */}
                {isLogin && <img src="/edit.gif" alt="edit" className='w-5 h-5 cursor-pointer' onClick={() => { skillInput.current.style.display = 'flex' }} />}
              </div>
              <div className='flex flex-col gap-4 py-10 border shadow-[2px_4px_4px_rgba(0,0,0,0.4)]  px-10  cmd:w-[420px] w-[280px]'>

                {userPortfolio?.skill ? userPortfolio.skill?.map((item) => {
                  return <div key={item._id} className='flex flex-col gap-2'>
                    <span>{item.slang}</span>
                    <div className=' h-[5px] bg-[#d2d2d2] rounded-md relative'>
                      <span className='bg-[#f85c70] h-full absolute' style={{ width: `${Number(item.spercentage)}%` }} ></span>
                    </div>
                  </div>
                }) : <>
                  <div className='flex flex-col gap-2'>
                    <span>Java</span>
                    <div className=' h-[5px] bg-[#d2d2d2] rounded-md relative'>
                      <span className='bg-[#f85c70] w-[80%] h-full absolute'></span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <span>Python</span>
                    <div className=' h-[5px] bg-[#d2d2d2] rounded-md relative'>
                      <span className='bg-[#f85c70] w-[85%] h-full absolute'></span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <span>JavaScript</span>
                    <div className=' h-[5px] bg-[#d2d2d2] rounded-md relative'>
                      <span className='bg-[#f85c70] w-[90%] h-full absolute'></span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <span>C</span>
                    <div className=' h-[5px] bg-[#d2d2d2] rounded-md relative'>
                      <span className='bg-[#f85c70] w-[70%] h-full absolute'></span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <span>MERN Stack</span>
                    <div className=' h-[5px] bg-[#d2d2d2] rounded-md relative'>
                      <span className='bg-[#f85c70] w-[95%] h-full absolute'></span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <span>NextJS</span>
                    <div className=' h-[5px] bg-[#d2d2d2] rounded-md relative'>
                      <span className='bg-[#f85c70] w-[90%] h-full absolute'></span>
                    </div>
                  </div></>}


              </div>
            </div>
            <div className='flex flex-col gap-4 cmd:min-h-[70vh]'>
              <div className='flex gap-3 items-center'>
                <h2 className='cmd:text-[34px] text-[28px] font-[400] '>Language</h2>
                {/* edit */}
                {isLogin && <img src="/edit.gif" alt="edit" className='w-5 h-5 cursor-pointer' onClick={() => { languageInput.current.style.display = 'flex' }} />}
              </div>
              <div className='flex flex-col gap-4 py-10 border shadow-[2px_4px_4px_rgba(0,0,0,0.4)]  px-10 cmd:w-[420px] w-[280px]'>

                {userPortfolio?.language ? userPortfolio.language?.map((item) => {
                  return <div key={item._id} className='flex flex-col gap-2'>
                    <span>{item.llang}</span>
                    <div className=' h-[5px] bg-[#d2d2d2] rounded-md relative'>
                      <span className='bg-[#f85c70] h-full absolute' style={{ width: `${Number(item.lpercentage)}%` }} ></span>
                    </div>
                  </div>
                }) : <>
                  <div className='flex flex-col gap-2'>
                    <span>English</span>
                    <div className=' h-[5px] bg-[#d2d2d2] rounded-md relative'>
                      <span className='bg-[#f85c70] w-[80%] h-full absolute'></span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <span>Hindi</span>
                    <div className=' h-[5px] bg-[#d2d2d2] rounded-md relative'>
                      <span className='bg-[#f85c70] w-[85%] h-full absolute'></span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <span>Odia</span>
                    <div className=' h-[5px] bg-[#d2d2d2] rounded-md relative'>
                      <span className='bg-[#f85c70] w-[98%] h-full absolute'></span>
                    </div>
                  </div>
                </>}
              </div>
            </div>
          </div>

          {/* contact */}
          <div className='relative justify-center mt-20 cmd:mt-0 flex ' ref={contactRef}>
            <Map locationName={userPortfolio?.personalInfo?.address || 'India'} />
            <div className='absolute z-20 flex flex-col cmd:flex-row justify-between cmd:justify-around gap-6 cmd:gap-20  py-20'>
              {/* email send */}
              <div className='bg-white border-2 shadow-[2px_4px_4px_rgba(0,0,0,0.4)] min-h-[70vh] flex flex-col w-[90vw] cmd:w-[45vw] px-5 py-5 cmd:px-8  gap-7 '>
                <span className='cmd:text-[34px] text-[28px]  font-[400]'>Send a message</span>
                <form onSubmit={sendemailSubmit}>
                  <div className='flex flex-col gap-5'>
                    <input type="text" name='sendername' required placeholder='Name *' value={sendemailForm.sendername} onChange={sendemailChange} className='px-3 py-2 border border-gray-500 rounded-md' />
                    <input type="email" name="senderemail" required placeholder='Email *' value={sendemailForm.senderemail} onChange={sendemailChange} className='px-3 py-2 border border-gray-500 rounded-md' />
                    <textarea name="sendermessage" rows={10} required placeholder='Message *' value={sendemailForm.sendermessage} onChange={sendemailChange} className='px-3 py-2 border border-gray-500 rounded-md'></textarea>
                    <button type='submit' className='border bg-red-500 text-white hover:bg-black hover:text-white px-2 py-2 transition-colors duration-500 rounded-md'>Send Message</button>
                  </div>
                </form>
              </div>
              {/* get in touch */}
              <div className=' bg-white border-2 shadow-[2px_4px_4px_rgba(0,0,0,0.4)] min-h-[70vh] flex flex-col px-5 py-5 cmd:px-9  gap-7 w-[90vw] cmd:w-[25vw] '>
                <span className='cmd:text-[34px] text-[28px]  font-[400] '>Get in touch</span>
                <div className='flex flex-col gap-5'>
                  <div className='flex gap-2'>
                    <img src="/phone.gif" alt="phone" className='w-6 h-6' />
                    <span className='flex flex-col'>
                      <span className='font-[500]'>Phone :</span>
                      <span>{userPortfolio?.personalInfo?.phone || '+ (123) 456-7890'}</span>
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <img src="/location.gif" alt="location" className='w-6 h-6' />
                    <span className='flex flex-col'>
                      <span className='font-[500]'>Address :</span>
                      <span className='cmd:max-w-[280px] max-w-[200px] text-ellipsis overflow-hidden'>{userPortfolio?.personalInfo?.address || 'Winterfell North Kingdom'}</span>
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <img src="/email.gif" alt="email" className='w-6 h-6' />
                    <span className='flex flex-col'>
                      <span className='font-[500]'>Email :</span>
                      <span>{userPortfolio?.personalInfo?.email || 'bastard@gmail.com'}</span>
                    </span>
                  </div>
                </div>
                <ul className='flex gap-4'>
                  <li><a href={userPortfolio?.personalInfo?.github || '#'}><img src="/demogit.gif" alt="github" className='w-6 h-6 filter invert' /></a></li>
                  <li><a href={userPortfolio?.personalInfo?.facebook || '#'}><img src="/demofab.gif" alt="facebook" className='w-6 h-6 filter invert' /></a></li>
                  <li><a href={userPortfolio?.personalInfo?.instagram || '#'}><img src="/demoinsta.gif" alt="insta" className='w-6 h-6 filter invert' /></a></li>
                  <li><a href={userPortfolio?.personalInfo?.linkedin || '#'}><img src="/demolink.gif" alt="linkedin" className='w-6 h-6 filter invert' /></a></li>
                </ul>
              </div>

            </div>
          </div>

          {/* Resume */}
          <div className='mt-20 flex justify-center' ref={resumeRef}>
            <iframe
              src={userPortfolio?.images?.resume || '/HappySamalResume.pdf'}
              className='w-[80%] h-[60vh] md:h-[85vh] sm:h-[50vh] shadow-[2px_4px_4px_rgba(0,0,0,0.4)] rounded-2xl'
            ></iframe>
          </div>


          {/* inputs from user */}

          {/* userInfo input*/}
          <div className='fixed top-20 cmd:top-40 w-full min-h-[80vh] cmd:min-h-[70vh] z-50  justify-center hidden' ref={userInfoInput} >
            <div className='text-white backdrop-blur-[3px] bg-black bg-opacity-60  w-[98%] cmd:w-[50vw] h-full absolute border shadow-[2px_4px_4px_rgba(0,0,0,0.8)]  flex-col items-center py-16 gap-12 flex ' >
              <img src="/cross.png" alt="cross" className='w-8 h-8 absolute top-4 right-4 cursor-pointer' onClick={() => { userInfoInput.current.style.display = 'none' }} />
              <div className='flex flex-col gap-7 w-full items-center'>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="greet" className='px-4'>Enter Greet</label>
                  <input type="text" name='greet' id='greet' placeholder='eg- Hello, I am' value={userInfoForm.greet}
                    onChange={userInfoChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="name" className='px-4'>Enter your name</label>
                  <input type="text" name='name' id='name' placeholder='eg- John Snow'
                    value={userInfoForm.name} onChange={userInfoChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="udesc" className='px-4'>Enter description</label>
                  <input type="text" name='udesc' id='udesc' placeholder='eg- Web Developer | Web Designer' value={userInfoForm.udesc} onChange={userInfoChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
              </div>
              <button className='w-[40%] rounded-3xl border bg-white text-black hover:bg-black hover:text-white px-2 py-2 transition-colors duration-500' onClick={userInfoSave}>Save</button>
            </div>
          </div>

          {/* whoiam input*/}
          <div className='fixed top-20 cmd:top-40 w-full min-h-[80vh] cmd:min-h-[70vh] z-50  justify-center hidden' ref={whoiamInput} >
            <div className='text-white backdrop-blur-[3px] bg-black bg-opacity-60  w-[98%] cmd:w-[50vw] h-full absolute border shadow-[2px_4px_4px_rgba(0,0,0,0.8)]  flex-col items-center py-16 gap-12 flex ' >
              <img src="/cross.png" alt="cross" className='w-8 h-8 absolute top-4 right-4 cursor-pointer' onClick={() => { whoiamInput.current.style.display = 'none' }} />
              <div className='flex flex-col gap-7 w-full items-center'>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="about" className='px-4'>Enter about</label>
                  <input type="text" name='about' id='about' placeholder='eg- Student at xyz college or Employee at xyz company' value={whoiamForm.about}
                    onChange={whoiamChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="wdesc" className='px-4'>Enter description</label>
                  <textarea name='wdesc' id='wdesc' placeholder='Write about yourself' value={whoiamForm.wdesc} onChange={whoiamChange} rows='5' className='rounded-3xl outline-none px-3 py-2 bg-transparent border placeholder:text-white' ></textarea>
                </div>
              </div>
              <button className='w-[40%] rounded-3xl border bg-white text-black hover:bg-black hover:text-white px-2 py-2 transition-colors duration-500' onClick={whoiamSave}>Save</button>
            </div>
          </div>

          {/* personalInfo input*/}
          <div className='fixed top-20 cmd:top-40 w-full min-h-[80vh] cmd:min-h-[70vh] z-50  justify-center hidden' ref={personalInput} >
            <div className='text-white backdrop-blur-[3px] bg-black bg-opacity-60  w-[98%] cmd:w-[50vw] h-full absolute border shadow-[2px_4px_4px_rgba(0,0,0,0.8)]  flex-col items-center py-16 gap-12 flex overflow-y-scroll scrollbar-rounded' >
              <img src="/cross.png" alt="cross" className='w-8 h-8 absolute top-4 right-4 cursor-pointer' onClick={() => { personalInput.current.style.display = 'none' }} />
              <div className='flex flex-col gap-7 w-full items-center'>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="birth" className='px-4'>Enter your birth date</label>
                  <input type="text" name='birth' id='birth' placeholder='eg- 27/01/2001' value={personalForm.birth}
                    onChange={personalChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="email" className='px-4'>Enter your email</label>
                  <input type="email" name='email' id='email' placeholder='eg- xyz@gmail.com'
                    value={personalForm.email} onChange={personalChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="phone" className='px-4'>Enter your phone number</label>
                  <input type="text" name='phone' id='phone' placeholder='eg- 833224242' value={personalForm.phone} onChange={personalChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="address" className='px-4'>Enter your address</label>
                  <input type="text" name='address' id='address' placeholder='eg- Bhubaneswar , odisha' value={personalForm.address} onChange={personalChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="github" className='px-4'>Enter github Link</label>
                  <input type="text" name='github' id='github' placeholder='eg- https://github.io/xyz' value={personalForm.github} onChange={personalChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="facebook" className='px-4'>Enter facebook Link</label>
                  <input type="text" name='facebook' id='facebook' placeholder='eg- https://facebook/xyz' value={personalForm.facebook} onChange={personalChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="instagram" className='px-4'>Enter instagram Link</label>
                  <input type="text" name='instagram' id='instagram' placeholder='eg- https://instagram/xyz' value={personalForm.instagram} onChange={personalChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="linkedin" className='px-4'>Enter linkedin Link</label>
                  <input type="text" name='linkedin' id='linkedin' placeholder='eg- https://linkedin/xyz' value={personalForm.linkedin} onChange={personalChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
              </div>
              <button className='w-[40%] rounded-3xl border bg-white text-black hover:bg-black hover:text-white px-2 py-2 transition-colors duration-500' onClick={personalSave}>Save</button>
            </div>
          </div>

          {/* expertise input*/}
          <div className='fixed top-20 cmd:top-40 w-full min-h-[80vh] cmd:min-h-[70vh] z-50  justify-center hidden' ref={expertiseInput} >
            <div className='text-white backdrop-blur-[3px] bg-black bg-opacity-60  w-[98%] cmd:w-[50vw] h-full absolute border shadow-[2px_4px_4px_rgba(0,0,0,0.8)]  flex-col items-center py-16 gap-12 flex ' >
              <img src="/cross.png" alt="cross" className='w-8 h-8 absolute top-4 right-4 cursor-pointer' onClick={() => { expertiseInput.current.style.display = 'none' }} />
              <div className='flex flex-col gap-7 w-full items-center'>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="main" className='px-4'>Enter expertise</label>
                  <input type="text" name='main' id='main' placeholder='eg- Web Developer' value={expertiseForm.main}
                    onChange={expertiseChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="sub" className='px-4'>Enter desc. about expertise</label>
                  <textarea type="text" name='sub' id='sub' placeholder='eg- I am a MERN stack developer' rows='3'
                    value={expertiseForm.sub} onChange={expertiseChange} className='px-3 py-2 rounded-3xl outline-none bg-transparent border placeholder:text-white'></textarea>
                </div>
              </div>
              <div className='flex flex-col  gap-5 w-full items-center'>
                <button className='w-[40%] rounded-3xl border bg-white text-black hover:bg-black hover:text-white px-2 py-2 transition-colors duration-500' onClick={expertiseAddClicked}>Add More +</button>
                <button className='w-[40%] rounded-3xl border bg-white text-black hover:bg-black hover:text-white px-2 py-2 transition-colors duration-500' onClick={expertiseSave}>Save</button>
              </div>
            </div>
          </div>

          {/* skill input*/}
          <div className='fixed top-20 cmd:top-40 w-full min-h-[80vh] cmd:min-h-[70vh] z-50  justify-center hidden' ref={skillInput} >
            <div className='text-white backdrop-blur-[3px] bg-black bg-opacity-60  w-[98%] cmd:w-[50vw] h-full absolute border shadow-[2px_4px_4px_rgba(0,0,0,0.8)]  flex-col items-center py-16 gap-12 flex ' >
              <img src="/cross.png" alt="cross" className='w-8 h-8 absolute top-4 right-4 cursor-pointer' onClick={() => { skillInput.current.style.display = 'none' }} />
              <div className='flex flex-col gap-7 w-full items-center'>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="slang" className='px-4'>Enter Skills</label>
                  <input type="text" name='slang' id='slang' placeholder='eg- Java , Python etc' value={skillForm.slang}
                    onChange={skillChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="spercentage" className='px-4'>Enter Percentage out of 100</label>
                  <input type="text" name='spercentage' id='spercentage' placeholder='eg- 70, 80 etc '
                    value={skillForm.spercentage} onChange={skillChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
              </div>
              <div className='flex flex-col  gap-5 w-full items-center'>
                <button className='w-[40%] rounded-3xl border bg-white text-black hover:bg-black hover:text-white px-2 py-2 transition-colors duration-500' onClick={skillAddClicked}>Add More +</button>
                <button className='w-[40%] rounded-3xl border bg-white text-black hover:bg-black hover:text-white px-2 py-2 transition-colors duration-500' onClick={skillSave}>Save</button>
              </div>
            </div>
          </div>

          {/* Language input*/}
          <div className='fixed top-20 cmd:top-40 w-full min-h-[80vh] cmd:min-h-[70vh] z-50  justify-center hidden' ref={languageInput} >
            <div className='text-white backdrop-blur-[3px] bg-black bg-opacity-60  w-[98%] cmd:w-[50vw] h-full absolute border shadow-[2px_4px_4px_rgba(0,0,0,0.8)]  flex-col items-center py-16 gap-12 flex ' >
              <img src="/cross.png" alt="cross" className='w-8 h-8 absolute top-4 right-4 cursor-pointer' onClick={() => { languageInput.current.style.display = 'none' }} />
              <div className='flex flex-col gap-7 w-full items-center'>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="llang" className='px-4'>Enter Language</label>
                  <input type="text" name='llang' id='llang' placeholder='eg- English , Hindi etc' value={languageForm.llang}
                    onChange={languageChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="lpercentage" className='px-4'>Enter Percentage out of 100</label>
                  <input type="text" name='lpercentage' id='lpercentage' placeholder='eg- 70, 80 etc '
                    value={languageForm.lpercentage} onChange={languageChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
              </div>
              <div className='flex flex-col  gap-5 w-full items-center'>
                <button className='w-[40%] rounded-3xl border bg-white text-black hover:bg-black hover:text-white px-2 py-2 transition-colors duration-500' onClick={languageAddClicked}>Add More +</button>
                <button className='w-[40%] rounded-3xl border bg-white text-black hover:bg-black hover:text-white px-2 py-2 transition-colors duration-500' onClick={languageSave}>Save</button>
              </div>
            </div>
          </div>

          {/* Images input */}
          <div className='fixed top-20 cmd:top-40 w-full min-h-[80vh] cmd:min-h-[70vh] z-50  justify-center hidden' ref={imageInput} >
            <div className='text-white backdrop-blur-[3px] bg-black bg-opacity-60  w-[98%] cmd:w-[50vw] h-full absolute border shadow-[2px_4px_4px_rgba(0,0,0,0.8)]  flex-col items-center py-16 gap-12 flex ' >
              <img src="/cross.png" alt="cross" className='w-8 h-8 absolute top-4 right-4 cursor-pointer' onClick={() => { imageInput.current.style.display = 'none' }} />

              <div className='flex flex-col gap-5 w-[80%]'>
                {message && <p className='text-red-600 font-semibold'>{message}</p>}

                <div className='flex flex-col gap-3'>
                  <label htmlFor="cover" className='mx-5'>Add your Cover photo</label>
                  <input type="file" accept="image/*" onChange={imageChange} name='cover' id='cover' className={`border ${message && 'border-red-600'} px-4 py-2 cursor-pointer rounded-3xl overflow-hidden`} />
                </div>
                <div className='flex flex-col gap-3'>
                  <label htmlFor="profile" className='mx-5'>Add your profile photo</label>
                  <input type="file" accept="image/*" onChange={imageChange} name='profile' id='profile' className={`border ${message && 'border-red-600'} px-5 py-2 cursor-pointer rounded-3xl overflow-hidden`} />
                </div>
                <div className='flex flex-col gap-3'>
                  <label htmlFor="resume" className='mx-5'>add your resume pdf</label>
                  <input type="file" accept="application/pdf" onChange={imageChange} name='resume' id='resume' className={`border ${message && 'border-red-600'} px-5 py-2 cursor-pointer rounded-3xl overflow-hidden`} />
                </div>
              </div>
              <button className='w-[40%] rounded-3xl border bg-white text-black hover:bg-black hover:text-white px-2 py-2 transition-colors duration-500' onClick={imageSave}>Save</button>
            </div>
          </div>

          {/* project input */}
          <div className='fixed top-20 cmd:top-40 w-full min-h-[80vh] cmd:min-h-[70vh] z-50  justify-center hidden' ref={projectInput} >
            <div className='text-white backdrop-blur-[3px] bg-black bg-opacity-60  w-[98%] cmd:w-[50vw] h-full absolute border shadow-[2px_4px_4px_rgba(0,0,0,0.8)]  flex-col items-center py-16 gap-12 flex overflow-y-scroll scrollbar-rounded' >
              <img src="/cross.png" alt="cross" className='w-8 h-8 absolute top-4 right-4 cursor-pointer' onClick={() => { projectInput.current.style.display = 'none' }} />
              <div className='flex flex-col gap-7 w-full items-center'>
                {message && <p className='text-red-600 font-semibold'>{message}</p>}

                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="pname" className='px-4'>Enter project name</label>
                  <input type="text" name='pname' id='pname' placeholder='eg- CreateFolio' value={projectForm.pname}
                    onChange={projectChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="puse" className='px-4'>Enter project usage</label>
                  <input type="text" name='puse' id='puse' placeholder='eg- React, Express , MongoDB' value={projectForm.puse}
                    onChange={projectChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="plink" className='px-4'>Enter project link</label>
                  <input type="text" name='plink' id='plink' placeholder='eg- https://createfolio.vercel.app' value={projectForm.plink}
                    onChange={projectChange} className='px-3 py-1 rounded-3xl outline-none bg-transparent border placeholder:text-white' />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="pimage" className='px-4'>Add your project image</label>
                  <input type="file" accept="image/*" onChange={pimageChange} ref={pimageInput} name='pimage' id='pimage' className={`border ${message && 'border-red-600'} px-4 py-2 cursor-pointer rounded-3xl overflow-hidden`} />
                </div>
              </div>
              <div className='flex flex-col  gap-5 w-full items-center'>
                <button className='w-[40%] rounded-3xl border bg-white text-black hover:bg-black hover:text-white px-2 py-2 transition-colors duration-500' onClick={projectAddClicked}>Add More +</button>
                <button className='w-[40%] rounded-3xl border bg-white text-black hover:bg-black hover:text-white px-2 py-2 transition-colors duration-500' onClick={projectSave}>Save</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default User
