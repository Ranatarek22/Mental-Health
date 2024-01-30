import React from "react";
import Heading from "./Heading";

export function Articles() {
  return (
    <div className="bg-white">
      <section className="container mx-auto flex flex-col gap-20 py-[100px] px-6">
        <Heading
          subHeading="Better information, Better health"
          heading="Our Articles"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 flex-wrap ">
          <div className="flex justify-start items-center gap-3  bg-[#D9D9D9] rounded-[30px] shadow-lg overflow-hidden">
            <div className=""></div>
            <div className="flex flex-col gap-2 p-4 items-start justify-start">
              <h2 className="font-bold text-xl text-[#4CAF50]">
                Monday 05, September 2021 | By Author
              </h2>
              <p className="text-gray-600">
                This Article’s Title goes Here, but not too long.
              </p>
              <div className="">69 69</div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-3  bg-[#D9D9D9] rounded-[30px] shadow-lg overflow-hidden">
            <div className="">
              {/* <Image
                src={"/landingImages/article-1.png"}
                width={200}
                height={200}
                alt="services"
                className="rounded-[30px]"
              /> */}
            </div>
            <div className="flex flex-col gap-2 p-4 items-start justify-start">
              <h2 className="font-bold text-xl text-[#4CAF50]">
                Monday 05, September 2021 | By Author
              </h2>
              <p className="text-gray-600">
                This Article’s Title goes Here, but not too long.
              </p>
              <div className="">69 69</div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-3  bg-[#D9D9D9] rounded-[30px] shadow-lg overflow-hidden">
            <div className="">
              {/* <Image
                src={"/landingImages/article-1.png"}
                width={200}
                height={200}
                alt="services"
                className="rounded-[30px]"
              /> */}
            </div>
            <div className="flex flex-col gap-2 p-4 items-start justify-start">
              <h2 className="font-bold text-xl text-[#4CAF50]">
                Monday 05, September 2021 | By Author
              </h2>
              <p className="text-gray-600">
                This Article’s Title goes Here, but not too long.
              </p>
              <div className="">69 69</div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-3  bg-[#D9D9D9] rounded-[30px] shadow-lg overflow-hidden">
            <div className="">
              {/* <Image
                src={"/landingImages/article-1.png"}
                width={200}
                height={200}
                alt="services"
                className="rounded-[30px]"
              /> */}
            </div>
            <div className="flex flex-col gap-2 p-4 items-start justify-start">
              <h2 className="font-bold text-xl text-[#4CAF50]">
                Monday 05, September 2021 | By Author
              </h2>
              <p className="text-gray-600">
                This Article’s Title goes Here, but not too long.
              </p>
              <div className="">69 69</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
