import { Inter } from "next/font/google";
import "./global.css";
// import Footer from "@/app/(pages)/component/Footer";
import Header from "@/app/(pages)/component/header/Header";
import Footer from "./component/footer/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-learningSiriusEg",
  description: "Full E-learning website built by Sirius team ",
  icons: { icon: "./2.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" overflow-x-hidden">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};
