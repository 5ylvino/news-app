import React from 'react';

function Pagination({ currentPage = 1, lastPage = 1, onNext, onPrevious }) {
  return (
    <div className='flex flex-wrap justify-end gap-2 mb-4'>
      {currentPage > 1 && (
        <button
          onClick={() => onNext(currentPage - 1)}
          className={`text-xs font-medium px-4 p-1 rounded-lg text-gray-600 hover:text-orange-600`}>
          Previous
        </button>
      )}
      <button className={`text-sm font-medium p-1 rounded-lg text-orange-600`}>
        {`${currentPage}/${lastPage}`}
      </button>
      {currentPage < lastPage && (
        <button
          onClick={() => onPrevious(currentPage + 1)}
          className={`text-xs font-medium px-4 p-1 rounded-lg text-gray-600 hover:text-orange-600`}>
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
