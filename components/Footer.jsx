import React from 'react';

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return(
    <footer className='bg-primary py-12 '>
      <div className="container mx-auto">
         <p className="text-white text-center">Copyright &copy; African prints {year}. All rights reserved</p>

      </div>
    </footer>
  )
};

export default Footer;
