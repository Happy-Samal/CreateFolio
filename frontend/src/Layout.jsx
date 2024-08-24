import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { HelmetProvider } from 'react-helmet-async';
import User from './components/User';

function Layout({ children }) {
  // check children is <User/> or not 
  const isUserComponent = React.isValidElement(children) && children.type === User;

  return (
    <HelmetProvider>
      {isUserComponent ? (children) : 
      (<>
        <Navbar />
        <div className="min-h-[150vh]">
          {children}
        </div>
        <Footer />
      </>
      )}
    </HelmetProvider>
  )
}

export default Layout;
