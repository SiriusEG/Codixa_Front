"use client";
import Image from "next/image";

const Checkoutpay = () => {
  return (
    <div className="shadow-md p-10  rounded-lg w-[80%] ">
      <h2 className="text-2xl font-semibold mb-4 ">Checkout</h2>
      <p className="text-gray-500 font-medium text-lg mb-2 ">Cart type</p>
      <div className="flex gap-3 items-center mb-8">
        <Image alt="pay" src="/checkout/1.png" width={100} height={100} />
        <Image alt="pay" src="/checkout/2.png" width={100} height={100} />
        <Image alt="pay" src="/checkout/3.png" width={100} height={100} />
        <Image alt="pay" src="/checkout/4.png" width={100} height={100} />
      </div>
      <form action="">
        <div className="flex flex-col gap-6 ">
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="font-semibold text-black text-sm">
              Name of Cart{" "}
            </label>
            <input
              type="text"
              id="name"
              className="outline-none ring-2 placeholder:text-sm ring-gray-200 p-2 rounded-md "
              placeholder="Enter name of Card"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="number"
              className="font-semibold text-black text-sm"
            >
              Cart Number{" "}
            </label>
            <input
              type="number"
              id="number"
              className="outline-none ring-2 placeholder:text-sm ring-gray-200 p-2 rounded-md "
              placeholder="Enter Card Number"
            />
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="number"
                className="font-semibold text-black text-sm"
              >
                Expiration Date ( MM/YY )
              </label>
              <input
                type="number"
                id="number"
                className="outline-none ring-2 placeholder:text-sm ring-gray-200 p-2 rounded-md "
                placeholder="Enter Expiration Date"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="number"
                className="font-semibold text-black text-sm"
              >
                CVC
              </label>
              <input
                type="number"
                id="number"
                className="outline-none ring-2 placeholder:text-sm ring-gray-200 p-2 rounded-md "
                placeholder="Enter Expiration Date"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2 mb-4">
          <input type="checkbox" name="check" id="check" />
          <label htmlFor="check" className="text-gray-400 text-sm ">
            Save my information for faster checkout
          </label>
        </div>
        <button className="text-white bg-primary rounded-md block py-2  px-4 w-full ">
          Confirm Payment
        </button>
      </form>
    </div>
  );
};

export default Checkoutpay;
