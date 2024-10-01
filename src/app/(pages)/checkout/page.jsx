import Summary from "./components/1-first sec/Summary";
import Checkoutpay from "./components/1-first sec/Checkoutpay";
import TopOffer from "./components/2-second sec/TopOffer";

const page = () => {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16 2xl:px-32">
      <div className="flex  flex-col-reverse lg:flex-row gap-8 py-10 justify-between items-center ">
        <Checkoutpay />
        <Summary />
      </div>
      <div className="mt-14 mb-4  ">
        <TopOffer />
      </div>
    </div>
  );
};

export default page;
