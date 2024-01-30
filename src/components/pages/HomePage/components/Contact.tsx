import React from "react";
import Heading from "./Heading";
export function Contact() {
  return (
    <section className="container mx-auto flex flex-col gap-20 py-[100px] px-6">
      <Heading subHeading="Get in touch" heading="Contact" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="bg-[#A8C7A9] p-12 rounded-[20px] shadow-lg text-gray-950 flex flex-col gap-4">
          <div className="flex flex-col gap-12">
            {/* <Image
              src={"/landingImages/phone.png"}
              alt=""
              width={60}
              height={60}
            /> */}
            <h1 className="font-bold text-2xl">Emergency</h1>
          </div>
          <div className="flex flex-col gap-2">
            <p>(237) 681-812-255</p>
            <p>(237) 681-812-255</p>
          </div>
        </div>
        <div className="bg-[#A8C7A9] p-12 rounded-[20px] shadow-lg text-gray-950 flex flex-col gap-4">
          <div className="flex flex-col gap-12">
            {/* <Image
              src={"/landingImages/mail.png"}
              alt="mail"
              width={60}
              height={60}
            /> */}
            <h1 className="font-bold text-2xl">Email</h1>
          </div>
          <div className="flex flex-col gap-2">
            <p>fildineeesoe@gmil.com</p>
            <p>myebstudios@gmail.com</p>
          </div>
        </div>
        <div className="bg-[#0B570E] p-12 rounded-[20px] shadow-lg text-gray-950 flex flex-col gap-4">
          <div className="flex flex-col gap-12">
            {/* <Image
              src={"/landingImages/location.png"}
              alt=""
              width={60}
              height={60}
            /> */}
            <h1 className="font-bold text-2xl">Location</h1>
          </div>
          <div className="flex flex-col gap-2">
            <p>0123 Some place</p>
            <p>9876 Some country</p>
          </div>
        </div>
        <div className="bg-[#A8C7A9] p-12 rounded-[20px] shadow-lg text-gray-950 flex flex-col gap-4">
          <div className="flex flex-col gap-12">
            {/* <Image
              src={"/landingImages/time.png"}
              alt=""
              width={60}
              height={60}
            /> */}
            <h1 className="font-bold text-2xl">Working Hours</h1>
          </div>
          <div className="flex flex-col gap-2">
            <p>Mon-Sat 09:00-20:00</p>
            <p>Sunday Emergency only</p>
          </div>
        </div>
      </div>
    </section>
  );
}
