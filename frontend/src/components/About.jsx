import React from 'react';
import { Helmet } from 'react-helmet-async';

function About() {
    return (
        <>
            <Helmet>
                <title>CreateFolio - About page</title>
                <meta name="description" content="CreateFolio - provide a platform where you make your portfolio in second" />
            </Helmet>
            <div className="text-white relative pt-40">
                <div className="bg-black">
                    <section id="features" className="relative block px-6 py-10 md:py-10 md:px-10 border-t border-b border-neutral-900 bg-neutral-900/30">
                        <div className="mx-[-10px] md:px-10 my-5">
                            <div className="flex pt-2 mb-10 justify-center text-4xl font-extrabold font-sans items-center">About Us</div>
                            <br />
                            <div className="text-center font-bold text-white">
                                &quot;Fueling Careers, One Portfolio at a Time&quot;
                            </div>
                            <p className="p-4 text-gray-200 text-md text-center font-sans">
                                At CreateFolio, we are dedicated to empowering individuals to showcase their talents and achievements through personalized portfolios. Our platform offers a seamless experience for users to create, manage, and display their portfolios with ease. Whether you’re a developer, designer, or artist, CreateFolio provides the tools and support needed to highlight your work and connect with potential opportunities. We believe that every creative journey deserves to be shared, and we’re here to ensure that your portfolio stands out and reflects your unique skills and passions. Join us in building a community where creativity and professionalism come together.
                            </p>
                            <p className="p-4 text-gray-200 text-md text-center font-sans">
                            Our mission at CreateFolio is to empower developers, designers, artists, and professionals by providing them with the tools and resources they need to build exceptional portfolios. Whether you’re a developer showcasing your latest projects, a designer presenting your creative work, an artist displaying your visual masterpieces, or a professional highlighting your skills and achievements, CreateFolio is here to support you every step of the way. We are committed to helping you craft a portfolio that not only reflects your unique talents but also opens doors to new opportunities and connections.
                            </p>
                            <p className="p-4 text-gray-200 text-md text-center font-sans">
                            At CreateFolio, we believe in the power of community and the incredible potential that unfolds when individuals come together to support each other. Our platform is more than just a portfolio builder; it's a space where your professional dreams can take shape and your unique talents can shine. By offering an intuitive and accessible way to create and manage your portfolio, we aim to foster a supportive environment that encourages creativity, showcases your achievements, and drives your career forward. Join us and be a part of a community where your success is our mission.
                            </p>
                            <p className="p-4 text-gray-200 text-md text-center font-sans">
                            At CreateFolio, we take pride in helping professionals showcase their full potential. We are passionate about leveraging technology to build a community that values and invests in individual talents. Join us on this exciting journey and be part of a movement that celebrates and sustains the achievements of developers, designers, artists, and professionals. Together, let’s bring your unique vision to life and drive creativity forward.
                            </p>
                        </div>
                        <div className="bg-white h-1 opacity-10 my-20"></div>
                        <div className="relative mx-auto max-w-5xl text-center">
                            <span className="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider">Why Choose Us</span>
                            <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">Showcase Your Talents and Elevate Your Career</h2>
                            <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
                            At CreateFolio, we empower developers, designers, artists, and professionals by providing an intuitive platform to showcase their work and connect with opportunities. No technical skills required—our user-friendly tools make it easy to build and manage a standout portfolio. Whether you’re looking to highlight your latest project or attract new opportunities, CreateFolio helps bring your professional vision to life with ease.
                            </p>
                        </div>
                        <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
                                <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border" style={{ backgroundImage: 'linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)', borderColor: 'rgb(93, 79, 240)' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-color-swatch" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"></path>
                                        <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"></path>
                                        <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
                                        <line x1="17" y1="17" x2="17" y2="17.01"></line>
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-gray-400">Easy Customization</h3>
                                <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                                Customize your portfolio’s design, from color schemes to fonts, to reflect your unique style and make a lasting impression.


                                </p>
                            </div>
                            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
                                <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border" style={{ backgroundImage: 'linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)', borderColor: 'rgb(93, 79, 240)' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bolt" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3"></polyline>
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-gray-400">High Performance</h3>
                                <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                                Our platform is optimized for fast performance, ensuring your portfolio loads quickly and is easily accessible to potential opportunities and connections.
                                </p>
                            </div>
                            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
                                <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border" style={{ backgroundImage: 'linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)', borderColor: 'rgb(93, 79, 240)' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-tools" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"></path>
                                        <line x1="14.5" y1="5.5" x2="18.5" y2="9.5"></line>
                                        <polyline points="12 8 7 3 3 7 8 12"></polyline>
                                        <line x1="7" y1="8" x2="5.5" y2="9.5"></line>
                                        <polyline points="16 12 21 17 17 21 12 16"></polyline>
                                        <line x1="17" y1="16" x2="15.5" y2="17.5"></line>
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-gray-400">Versatile Tools</h3>
                                <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                                We offer a range of tools and integrations to help you maximize your portfolio’s impact, from performance analytics to seamless social sharing.

                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default About;

