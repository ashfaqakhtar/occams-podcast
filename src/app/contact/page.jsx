import React, { Fragment } from 'react'
import ContactWave from './ContactWave'
import { CONTACT_DATA } from '@/utils/staticData'

const Contact = () => {
    return (
        <Fragment>
            <section className="relative h-[90vh]">
                <div className="absolute inset-0">
                    <div style={{ backgroundImage: "url(/images/contact-banner-desktop.webp)" }}
                        className="hidden sm:block h-full bg-cover lg:bg-center md:bg-position-[90%] bg-position-[80%]"
                    />

                    <div className="block sm:hidden h-full w-full bg-cover bg-bottom"
                        style={{ backgroundImage: "url(/images/contact-banner-mobile.webp)" }}
                    />
                </div>

                <div className='sm:px-10 px-5 h-full'>
                    <div className="container mx-auto h-full">
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-6 h-full">
                            <div className="md:col-span-9 lg:col-span-7">
                                <h1 className="heading-1 text-white lg:mt-0 md:-mt-20 mt-15">
                                    Let’s Connect
                                </h1>

                                <p className='body-2 text-[#E8E8E8] font-light mt-4 lg:max-w-xl'>
                                    Have a question about the podcast, a guest idea, or a possible collaboration? Reach out
                                    and tell us what’s on your mind.
                                </p>
                            </div>

                            <div className="md:col-span-3 lg:col-span-5" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="spacing">
                <ContactWave />
            </div>

            <section className="sm:px-10 px-5">
                <div className="container mx-auto spacing">
                    <div className="w-full rounded-xl bg-[#341606] px-4 lg:px-5 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {CONTACT_DATA?.map((data, index) => (
                                <div key={index} className="flex sm:flex-row flex-col items-start gap-4">
                                    <img src={data?.image} alt={data?.title}
                                        className="h-auto w-max object-contain mt-1"
                                    />

                                    <div className="">
                                        <h6 className="heading-6 text-white">{data?.title}</h6>
                                        <p className="body-1 text-white sm:mt-1">{data?.sub_title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Contact