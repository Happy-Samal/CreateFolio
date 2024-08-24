import React from 'react';
import { Helmet } from 'react-helmet-async';

function ContactUs() {
  return (
    <>
      <Helmet>
        <title>CreateFolio - contact us</title>
        <meta name="description" content="CreateFolio - provide a platform where you make your portfolio in second" />
      </Helmet>
      <div className="text-white relative pt-40">
        <div className="bg-black">
          <section
            id="features"
            className="relative block px-6 py-10 md:py-10 md:px-10 border-t border-b border-neutral-900 bg-neutral-900/30"
          >
            <div className="mx-[-10px] md:px-10 my-5">
              <div className="flex pt-2 mb-10 justify-center text-4xl font-extrabold font-sans items-center">
                Contact Us
              </div>
              <br />
              <div className="text-center font-bold text-white">
                We&apos;d love to hear from you!
              </div>
              <p className="p-4 text-gray-200 text-md text-center font-sans">
                If you have any questions, feedback, or need support, feel free to
                reach out to us:
              </p>
              <p className="p-4 text-gray-200 text-md text-center font-sans flex flex-col">
                <span>Email: support@needmoney.com</span>
                <span>Phone: +1-800-123-4567</span>
                <span>Address: 003 Creator Lane, Innovation City, CA 3377</span>
              </p>
              <p className="p-4 text-gray-200 text-md text-center font-sans flex flex-col ">
                <span className='sm:text-[20px] font-semibold'>Follow us on social media for the latest updates and news:</span>
                <span>Instagram</span>
                <span>Facebook</span>
                <span>LinkedIn</span>
              </p>
            </div>
            <div className="bg-white h-1 opacity-10 my-20"></div>
          </section>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
