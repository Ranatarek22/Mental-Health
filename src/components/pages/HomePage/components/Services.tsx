import React from "react";
import Heading from "./Heading";

function Services() {
  return (
    <section className="container mx-auto flex flex-col gap-20 py-[100px]">
      <Heading
        subHeading="Our services made for you?"
        heading="Our services made for you?"
      />
      <div className="flex justify-center items-center gap-20">
        <div className="flex justify-center items-center flex-col gap-10 py-10 px-16 bg-white rounded-[20px] shadow-lg">
          <div className="bg-[#A8C7A9] p-6 rounded-full">
            {/* <Image
              src={"/landingImages/services-1.png"}
              width={50}
              height={50}
              alt="services"
            /> */}
          </div>
          <div className="font-bold text-2xl">Online Community</div>
          <p className="text-gray-600 font-medium text-center">
            Welcome to our thriving Online Community! Connect with like-minded
            individuals, share experiences, and support one another on your
            journey.
          </p>
        </div>
        <div className="flex justify-center items-center flex-col gap-10 py-10 px-16 bg-white rounded-[20px] shadow-lg">
          <div className="bg-[#A8C7A9] p-6 rounded-full">
            {/* <Image
              src={"/landingImages/services-2.png"}
              width={50}
              height={50}
              alt="services"
            /> */}
          </div>
          <div className="font-bold text-2xl">Discover 1000+ article</div>
          <p className="text-gray-600 font-medium text-center">
            Unlock insights in psychology with 1000+ articles. From mental
            well-being to self-care tips, discover resources to enhance your
            understanding and empower your journey
          </p>
        </div>
        <div className="flex justify-center items-center flex-col gap-10 py-10 px-16 bg-white rounded-[20px] shadow-lg">
          <div className="bg-[#A8C7A9] p-6 rounded-full">
            {/* <Image
              src={"/landingImages/services-3.png"}
              width={50}
              height={50}
              alt="services"
            /> */}
          </div>
          <div className="font-bold text-2xl">Reach 100+ doctors</div>
          <p className="text-gray-600 font-medium text-center">
            Access superior healthcare with 100+ expert doctors. Our diverse
            team offers personalized care, ensuring you receive the best medical
            expertise for your well-being.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Services;
