import React from 'react';

const Error = ({ message }) => {
  return (
    <div className='bg-[rgba(0,0,0,0.2)] absolute inset-0 h-screen flex items-center justify-center'>
      <div className='text-red-500'>{message}</div>
    </div>
  );
};

export default Error;
