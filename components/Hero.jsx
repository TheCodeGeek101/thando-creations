import React from 'react';
// import WomanImg from '../img/woman_hero.png';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className='h-[800px] bg-no-repeat bg-cover bg-center py-24'>
      <div className='container mx-auto flex justify-around h-full'>
        {/* text */}
        <div>
          <div className='flex flex-col justify-center '>
            {/* Pre title */}
            <div className='font-semibold flex items-center uppercase'>
              <div className='w-10 h-[2px] bg-red-500 mr-3'></div>
              New trend
            </div>
          </div>
          {/* title */}
          <h1 className='text-[70px] leading-[1.1] font-light mb-4'>
            AUTUM SALE STYLISH <br />
            <span className='font-semibold'>WOMENS</span>
          </h1>
          <Link href='/' passHref>
            <p className='self-start font-semibold border-b-2 border-primary'>
              Discover More
            </p>
          </Link>
        </div>
        {/* image */}
        <div className='hidden lg:block'>
          {/* <img src={WomanImg} alt='' /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
