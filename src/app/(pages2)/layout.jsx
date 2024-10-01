import { Inter } from "next/font/google";
import "./global.css";
import StoreProvider from "../StoreProvider";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Image from "next/image";

export const metadata = {
  title: "E-learningSiriusEg",
  description: "Full E-learning website built by Sirius team ",
  icons: { icon: "./2.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" overflow-x-hidden font-primary">
        <StoreProvider>
          <div className="  w-full ">
            <div className="flex flex-col sm:flex-row h-screen justify-center  items-center">
              {/* image side */}
              <div className="sm:w-1/2 w-full relative hidden sm:block">
                {" "}
                <Image
                  src="/learnmore.jpg"
                  alt="teacher"
                  width={800}
                  height={500}
                  className=" h-2/5 w-full sm:h-screen"
                />
                <div className="absolute inset-0 bg-black opacity-30" />
                <div className=" absolute bottom-1/2 left-5">
                  <h1 className="text-6xl text-white font-bold text-left pt-10">
                    <span className="text-7xl text-primary">C</span>odixa
                  </h1>
                  <p className="text-white backdrop-blur-sm text-center text-xl font-semibold p-[25px] rounded-md relative right-4 ">
                    <FaQuoteLeft className="text-black  mb-2 " />
                    Learning is not a destination, but a continuous journey. The
                    more you seek to improve, the further you discover you can
                    go. Growth happens when you embrace the process, not just
                    the goal.
                    <FaQuoteRight className="text-black right-0 absolute" />
                  </p>
                </div>
              </div>

              {children}
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
