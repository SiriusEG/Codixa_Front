import { Inter } from "next/font/google";
import "./global.css";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-learningSiriusEg",
  description: "Full E-learning website built by Sirius team ",
  icons: { icon: "./2.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Header />
      {children}
      <Footer />
      </body>
    </html>
  );
}
