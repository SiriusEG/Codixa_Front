import React from "react";

function RightSec() {
  return (
    <div className="col-span-1 flex -items-center justify-center">
      <form className=" px-8 pt-6 pb-8 mb-4">
        <div className="mb-3">
          <label
            className="block font-semibold text-black text-sm mb-3"
            htmlFor="userName"
          >
            User name
          </label>

          <input
            className="appearance-none placeholder-opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
            id="userName"
            type="text"
            placeholder="User name"
          />
        </div>

        <div className="mb-3 ">
          <label
            className="block font-semibold text-black text-sm mb-3"
            htmlFor="emailAdress"
          >
            Email Address
          </label>
          <input
            className="appearance-none placeholder-opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
            id="emailAdress"
            type="text"
            placeholder="Email Address"
          />
        </div>

        <div className="mb-3 ">
          <label
            className="block font-semibold text-black text-sm mb-3"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            rows={5}
            cols={45}
            className="appearance-none placeholder-opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
            id="message"
            placeholder="Message"
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-primary w-[150px] text-white font-semibold py-2 px-5 rounded-3xl outline-none focus:shadow-outline"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default RightSec;
