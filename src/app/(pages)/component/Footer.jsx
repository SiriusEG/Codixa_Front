import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaDribbble,
  FaFacebook,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-8">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-6 gap-8">
        <div className="col-span-2 flex items-center">
          <img src="/logo.gif" alt="logo" className="w-20 h-20 m-5" />
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold">Codixa</h2>
            <p className="text-sm">
              Top learning experiences that create more talent in the world.
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold opacity-70 mb-4">Product</h4>
          <ul className=" font-semibold space-y-2 text-sm">
            <li className="hovringFooter">Overview</li>
            <li className="hovringFooter">Features</li>
            <li className="hovringFooter">Solutions</li>
            <li className="hovringFooter">Tutorials</li>
            <li className="hovringFooter">Pricing</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold opacity-70 mb-4">Company</h4>
          <ul className=" font-semibold space-y-2 text-sm">
            <li className="hovringFooter">About us</li>
            <li className="hovringFooter">Careers</li>
            <li className="relative">
              <span className="hovringFooter">Press</span>{" "}
              <span className="ml-2 text-xs bg-white text-green-800 rounded px-2 py-1">
                New
              </span>
            </li>
            <li className="hovringFooter">News</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold opacity-70 mb-4">Social</h4>
          <ul className="space-y-2 font-semibold text-sm">
            <li className="hovringFooter">Twitter</li>
            <li className="hovringFooter">LinkedIn</li>
            <li className="hovringFooter">GitHub</li>
            <li className="hovringFooter">Dribbble</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold opacity-70 mb-4">Legal</h4>
          <ul className="space-y-2 font-semibold text-sm">
            <li className="hovringFooter">Terms</li>
            <li className="hovringFooter">Privacy</li>
            <li className="hovringFooter">Cookies</li>
            <li className="hovringFooter">Contact</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8 flex flex-col md:flex-row items-center justify-around text-sm">
        <p className="mb-4 md:mb-0">© 2024 Codixa. All rights reserved.</p>
        <div className="flex space-x-4">
          <FaLinkedin
            size={24}
            className=" hover:text-primary hover:scale-110 transition delay-100 cursor-pointer"
          />
          <FaFacebook
            size={24}
            className=" hover:text-primary hover:scale-110 transition delay-100 cursor-pointer"
          />
          <FaGithub
            size={24}
            className=" hover:text-primary hover:scale-110 transition delay-100 cursor-pointer"
          />
          <FaDribbble
            size={24}
            className=" hover:text-primary hover:scale-110 transition delay-100 cursor-pointer"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
