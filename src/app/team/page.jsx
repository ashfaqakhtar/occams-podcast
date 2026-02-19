import React, { Fragment } from 'react'
import LeadershipSection from './TeamWave'
import BtnComponent from '@/components/BtnComponent'

const Team = () => {
    return (
        <Fragment>
            <section className="relative h-[90vh]">
                <div className="absolute inset-0">
                    <div style={{ backgroundImage: "url(/images/team-banner-desktop.webp)" }}
                        className="hidden sm:block h-full bg-cover lg:bg-center md:bg-position-[90%] bg-position-[80%]"
                    />

                    <div className="block sm:hidden h-full w-full bg-cover bg-bottom"
                        style={{ backgroundImage: "url(/images/team-banner-mobile.webp)" }}
                    />
                </div>

                <div className='sm:px-10 px-5 h-full'>
                    <div className="container mx-auto h-full">
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-6 h-full">
                            <div className="md:col-span-9 lg:col-span-7">
                                <h1 className="heading-1 text-white lg:mt-0 md:-mt-20 mt-15">
                                    People behind the conversations
                                </h1>

                                <p className='body-2 text-[#E8E8E8] font-light mt-4 lg:max-w-2xl'>
                                    Inception to Infinity is run by a multidisciplinary team. Our leadership ensures
                                    every deep dialogue stays grounded, sharp, and purposeful.
                                </p>
                            </div>

                            <div className="md:col-span-3 lg:col-span-5" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="spacing">
                <LeadershipSection />
            </div>

            <section className="sm:px-10 px-5">
                <div className="container mx-auto spacing">
                    <div className="relative rounded-3xl bg-cover bg-center px-6 sm:px-12 py-7 text-center"
                        style={{ backgroundImage: "url('/images/part-of-podcast.png')" }}
                    >

                        <div className="relative z-10 spacing">
                            <h2 className="heading-2 text-white max-w-2xl mx-auto">
                                Interested in being part of the podcast?
                            </h2>

                            <h6 className="mt-4 text-white heading-6">
                                If you have an idea, a story, or a reason to connect, we’re open to hearing from you.
                            </h6>

                            <div className="mt-8">
                                <BtnComponent btn_title={'Reserve your spot'} btn_url={'https://calendly.com/occamspodcast/2?back=1&month=2026-02'} className="py-2 pl-5 pr-2.5"
                                    image={'/logo/right-arrow.png'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Team