import React from 'react';

const Loader = () => {
  return (
    <div className='bg-[rgba(0,0,0,0.2)] absolute inset-0 h-screen flex items-center justify-center'>
      <div className='animate-spin h-8 w-8 border-4 border-orange-600 border-t-transparent rounded-full'></div>
    </div>
  );
};

export default Loader;
