import React from "react";

function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center">
      <section className="container mx-auto flex flex-col gap-20 px-6">
        <div className="flex justify-between items-center flex-col-reverse md:flex-row">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-1">
              <p className="text-xl md:text-2xl font-bold text-[#0B570E]">
                Caring for Life
              </p>
              <p className="text-2xl md:text-4xl font-semibold">
                Leading the Way <br /> in Medical Excellence
              </p>
            </div>
            <p className="text-md  md:text-lg font-normal text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia{" "}
              <br />
              quos facilis illum vitae modi. Inventore, ex porro! Quo, provident{" "}
              <br />
              fugit! Ea praesentium facilis optio dicta odit laudantium nostrum{" "}
              <br />
              recusandae. Aliquam?
            </p>
            <button className="w-full bg-[#1d491f] text-white font-medium px-4 py-2 rounded-full shadow-lg transition-all hover:scale-105 hover:bg-[#143116] md:w-fit text-xl">
              Get Started
            </button>
          </div>
          <div className="">
            {/* <Image
              src={"/landingImages/hero.png"}
              width={500}
              height={300}
              alt="hero"
            /> */}
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-20 gap-y-5 flex-col xl:flex-row">
          <div className="w-[320px] flex justify-between items-center p-6 px-10 bg-[#4CAF50] rounded-3xl shadow-xl">
            <p className="text-white text-xl font-semibold">Attend meeting</p>
            {/* <Image
              src={"/landingImages/calender.png"}
              alt=""
              width={60}
              height={60}
            /> */}
          </div>
          <div className="w-[320px] flex justify-between items-center p-6 px-10 bg-[#0B570E] rounded-3xl shadow-xl">
            <p className="text-white text-xl font-semibold">Find a doctor</p>
            {/* <Image
              src={"/landingImages/doctors.png"}
              alt=""
              width={60}
              height={60}
            /> */}
          </div>
          <div className="w-[320px] flex justify-between items-center p-6 px-10 bg-[#7ea17f] rounded-3xl shadow-xl">
            <p className="text-white text-xl font-semibold">Depression Test</p>
            {/* <Image
              src={"/landingImages/brain.png"}
              alt=""
              width={60}
              height={60}
            /> */}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Hero;
