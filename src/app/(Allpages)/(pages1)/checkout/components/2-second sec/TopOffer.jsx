import Link from 'next/link'


const TopOffer = () => {
   const DataOffer=[
    {
      id:1,
      url:'url(/checkout/back1.png)',
      offer:"50%",
      title:" Lorem ipsum dolor ",
      discription:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam incidunt vero necessitatibus ducimus architecto, itaque asperiores iure pariatur quibusdam explicabo maiores enim sit nemo modi",
    },
    {
      id:2,
      url:'url(/checkout/back2.png)',
      offer:"10%",
      title:" Lorem ipsum dolor ",
      discription:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam incidunt vero necessitatibus ducimus architecto, itaque asperiores iure pariatur quibusdam explicabo maiores enim sit nemo modi",
    },
    {
      id:3,
      url:'url(/checkout/back1.png)',
      offer:"50%",
      title:" Lorem ipsum dolor ",
      discription:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam incidunt vero necessitatibus ducimus architecto, itaque asperiores iure pariatur quibusdam explicabo maiores enim sit nemo modi",
    },
   ] 

  return (
    <div className="">
        <div className="flex items-center mb-8 justify-between gap-8">
          <h2 className='text-3xl font-bold ml-5 self-center sm:self-start'>Top Education offers and deals are listed here</h2>
          <Link   href="/alloffer"
          className="text-primary text-lg hover:text-primary-100">See all</Link>
        </div>
        <div className="flex  flex-wrap  flex-row px-16 lg:px-0 gap-8 justify-between items-center">
          {DataOffer.map((item)=>(
              <div key={item.id}  
           
              className="lg:w-[30%] md:w-[45%] w-full  "
              >
                  <div    style={{ 
                backgroundImage: item.url, 
                backgroundSize: "cover", 
                backgroundPosition: "center" 
              }}  className="flex flex-col lg:items-start items-center object-cover    justify-center  gap-4 text-white lg:leading-3 xl:leading-5 rounded-lg h-64 lg:h-[400px]  p-8">
                  <span className="p-3 lg:text-2xl text-lg  rounded-md bg-primary ">{item.offer}</span>
                  <h2 className='text-xl font-semibold'> {item.title} </h2>
                  <p className='xl:leading-8 font-normal  lg:leading-5'>{item.discription}</p>
                  </div>
              </div>
          ))}
        </div>

    </div>
  )
}

export default TopOffer