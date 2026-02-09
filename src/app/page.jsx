

export default function Home() {
  return (
    <>
      <section className="hero-section h-screen flex justify-center items-center">
        <div className="container mx-auto px-4">

         
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center">
              <div></div>
              <div>
                <small className="text-white font-inter text-[1.375rem] font-light leading-7.5">A podcast by Powered Occams Digital </small>
                <h1 className="text-white font-inter text-[4.375rem] font-medium leading-19.5 tracking-[-0.13125rem]">Inception to Infinity</h1>
                <p className="text-white font-inter text-lg font-light leading-7.5">Strategic conversations with founders, CEOs, and industry builders, tracing how bold ideas move from inception to lasting, real-world impact through decisive moments and hard-won insight.</p>
              </div>

            </div>
        </div>
      </section>
    </>
  );
}

