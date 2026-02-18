import React, { Fragment } from 'react'

const Episodes = () => {
    return (
        <Fragment>
            <section className="relative h-[90vh]">
                <div className="absolute inset-0">
                    <div style={{ backgroundImage: "url(/images/episodes-banner-desktop.webp)" }}
                        className="hidden md:block h-full bg-cover lg:bg-center md:bg-position-[90%] bg-position-[80%]"
                    />

                    <div className="block md:hidden h-full w-full bg-cover bg-bottom"
                        style={{ backgroundImage: "url(/images/episodes-banner-mobile.webp)" }}
                    />
                </div>

                <div className='sm:px-10 px-5 h-full'>
                    <div className="container mx-auto h-full">
                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <h1 className="heading-1 text-white text-center">
                                Episodes
                            </h1>

                            <p className='body-2 text-[#E8E8E8] font-light mt-4 text-center lg:max-w-xl'>
                                Browse our complete collection of conversations with industry leaders.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Episodes