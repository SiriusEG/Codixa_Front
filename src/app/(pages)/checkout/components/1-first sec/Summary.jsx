import Image from "next/image";

const Summary = () => {
  const Tax = 5;
  const Coupondiscpint = 0;

  const CartData = [
    {
      id: 1,
      url: "/checkout/summary.png",
      name: "Product one",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      price: 20,
    },
    {
      id: 2,
      url: "/checkout/summary.png",
      name: "Product Two",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      price: 48,
    },
  ];
  let subtotal = CartData.reduce((accumulator, currentProduct) => {
    return accumulator + currentProduct.price;
  }, 0);
  return (
    <div className="shadow-sm p-6 bg-[rgba(157,204,255,0.4)]  rounded-lg h-[80%] ">
      <h4 className="font-semibold text-xl mb-4 ">Summary</h4>
      <div className="flex flex-col justify-center  gap-4">
        {CartData.map((item) => (
          <div key={item.id} className="">
            <div className="flex items-center mb-4 ">
              <div className="w-1/3 relative">
                <Image
                  alt="product"
                  src={item.url}
                  height={100}
                  width={100}
                  className="object-cover
                  "
                />
              </div>
              <div className="w-2/3 flex flex-col gap-2 ">
                <h2 className="font-bold text-xl ">{item.name}</h2>
                <p className="text-gray-10 ">{item.description}</p>
                <h3 className="font-semibold text-lg">${item.price}</h3>
              </div>
            </div>
            <div className="bg-gray-400 h-[1px] w-[100%] " />
          </div>
        ))}
        <div className="flex justify-between font-medium  items-center">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="bg-gray-400 h-[1px] w-[100%] " />
        <div className="flex justify-between font-medium items-center">
          <span>Coupon Discount</span>
          <span>{Coupondiscpint}%</span>
        </div>
        <div className="bg-gray-400 h-[1px] w-[100%] " />
        <div className="flex justify-between font-medium  items-center">
          <span>TAX</span>
          <span>${Tax}</span>
        </div>
        <div className="bg-gray-400 h-[1px] w-[100%] " />
        <div className="flex justify-between font-semibold  items-center">
          <span>Total</span>
          <span>${subtotal + Coupondiscpint * subtotal + Tax}</span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
