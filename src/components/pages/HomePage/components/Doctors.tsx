import React from "react";
import Heading from "./Heading";
export function Doctors() {
  return (
    <section className="container mx-auto flex flex-col gap-20 py-[100px]">
      <Heading subHeading="Trusted Care" heading="Our Doctors" />
      <div className="flex justify-center items-center gap-20">
        <div className="flex justify-center items-center flex-col gap-3 max-w-[350px] bg-[#A8C7A9] rounded-[30px] shadow-lg">
          <div className="">
            {/* <Image
              src={"/landingImages/doctor-1.png"}
              width={350}
              height={400}
              alt="services"
            /> */}
          </div>
          <div className="flex flex-col gap-2 p-6 items-center justify-center">
            <h2 className="font-bold text-2xl">Doctor’s Name</h2>
            <p className="font-medium text-xl">Neurology</p>
            <p className="text-gray-600 text-center">
              Connect with like-minded individuals, share experiences, and
              support one another on your journey.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col gap-3 max-w-[350px] bg-[#A8C7A9] rounded-[30px] shadow-lg">
          <div className="">
            {/* <Image
              src={"/landingImages/doctor-2.png"}
              width={350}
              height={400}
              alt="services"
            /> */}
          </div>
          <div className="flex flex-col gap-2 p-6 items-center justify-center">
            <h2 className="font-bold text-2xl">Doctor’s Name</h2>
            <p className="font-medium text-xl">Neurology</p>
            <p className="text-gray-600 text-center">
              Connect with like-minded individuals, share experiences, and
              support one another on your journey.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col gap-3 max-w-[350px] bg-[#A8C7A9] rounded-[30px] shadow-lg">
          <div className="">
            {/* <Image
              src={"/landingImages/doctor-3.png"}
              width={350}
              height={400}
              alt="services"
            /> */}
          </div>
          <div className="flex flex-col gap-2 p-6 items-center justify-center">
            <h2 className="font-bold text-2xl">Doctor’s Name</h2>
            <p className="font-medium text-xl">Neurology</p>
            <p className="text-gray-600 text-center">
              Connect with like-minded individuals, share experiences, and
              support one another on your journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
