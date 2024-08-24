import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home';
import About from './components/About';
import ContactUs from './components/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsCondition from './components/TermsCondition';
import User from './components/User';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound'
import Error from './components/Error';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>
  },
  {
    path: '/about',
    element: <Layout><About /></Layout>
  },
  {
    path: '/contactUs',
    element: <Layout><ContactUs /></Layout>
  },
  {
    path: '/privacyPolicy',
    element: <Layout><PrivacyPolicy /></Layout>
  },
  {
    path: '/termsCondition',
    element: <Layout><TermsCondition /></Layout>
  },
  {
    path: '/user/:username',
    element: <Layout><User/></Layout>
  },
  {
    path: '/login',
    element:<Layout><Login/></Layout>
  },
  {
    path: '/dashboard',
    element:<Layout><Dashboard/></Layout>
  },
  {
    path:'/error',
    element:<Layout><Error/></Layout>
  },
  {
    path: '/*',
    element:<Layout><NotFound/></Layout>
  },
]);

function App() {
  return <>
    <div
      className="absolute top-0 left-0 z-0 h-1/3 w-full"
      style={{
        backgroundImage:
          "linear-gradient(to left bottom, rgba(79, 70, 229, 0.2) 0%, transparent 50%, transparent 100%)",
        borderColor: "rgba(92, 79, 240, 0.2)",
      }}
    ></div>
    <div
      className="absolute top-0 right-0 z-0 h-1/3 w-full"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, rgba(220, 38, 38, 0.2) 0%, transparent 50%, transparent 100%)",
        borderColor: "rgba(92, 79, 240, 0.2)",
      }}
    ></div>
    <RouterProvider router={router} />
  </>
}

export default App;