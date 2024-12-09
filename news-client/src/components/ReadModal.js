import React from 'react';

function ReadModal({ item, visible = false, onClose }) {
  if (!visible) {
    return null;
  }

  return (
    <div className='bg-[rgba(0,0,0,0.2)] fixed inset-0'>
      <div className='bg-white shadow-md rounded-lg p-4 m-6'>
        <div className='flex justify-end items-end mb-4'>
          <span
            className='text-xl text-gray-500 font-bold cursor-pointer'
            onClick={() => onClose(undefined)}>
            X
          </span>
        </div>
        <div className='block md:flex justify-center items-start'>
          <img
            src={
              item.image_url ??
              'https://via.placeholder.com/600x300?text=No+image'
            }
            alt='Trending'
            className='rounded-lg mb-4 w-full md:w-2/3'
          />
          <div className='p-0 md:p-4'>
            <h3 className='text-xl font-bold'>{item.title}</h3>
            <div className='text-gray-600 text-sm'>{item.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadModal;
