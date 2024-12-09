import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { filterList, filterListWithImage } from '../utils/list-helpers';
import httpClient from '../service/client';
import { API_ENDPOINTS } from '../service/api-endpoints';
import { toast } from 'react-toastify';

const filterOptions = [
  { name: 'All', search_term: '' },
  { name: 'Today', search_term: 'today' },
  { name: 'Yesterday', search_term: 'yesterday' },
  { name: '3 days ago', search_term: '3 days ago' }
];

const MainLayer = ({ pagination, data }) => {
  const [listPagination, setListPagination] = useState();
  const [listWithImage, setListWithImage] = useState([]);

  useEffect(() => {
    setListWithImage(filterListWithImage(data));
    setListPagination(pagination);
  }, []);

  const handleOnFilter = url => {
    httpClient
      .get(url)
      .then(response => {
        const data = response.data;
        const { data: list, ...rest } = data;
        setListWithImage(filterList(list));
        setListPagination(rest);

        if (!data?.error && list?.length > 0) {
          toast.success(data?.message);
        } else if (!data?.error && list?.length > 0) {
          toast.info('Not available');
        }
      })
      .catch(error => {
        toast.error(error?.message);
      });
  };

  const onNext = newPage => {
    newPage && handleOnFilter(`${API_ENDPOINTS.articles}?page=${newPage}`);
  };

  const onPrevious = newPage => {
    newPage && handleOnFilter(`${API_ENDPOINTS.articles}?page=${newPage}`);
  };

  const onSearch = params => {
    params && handleOnFilter(`${API_ENDPOINTS.articles}${params}`);
  };

  return (
    <main className='w-full lg:w-2/4 mr-0 md:mr-4'>
      {/* Search Section */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search News'
          className='w-full bg-gray-100 rounded-full px-4 py-2 focus:outline-none'
          onChange={e => onSearch(`?title=${e?.target?.value}`)}
        />
        <div className='flex flex-wrap mt-2 gap-2'>
          {filterOptions.map(({ name, search_term }, index) => (
            <button
              onClick={e =>
                onSearch(search_term ? `?date=${search_term}` : '?page=1')
              }
              key={index}
              className='text-sm bg-gray-200 px-4 py-1 rounded-full hover:bg-gray-300'>
              {name}
            </button>
          ))}
        </div>
      </div>

      <Pagination
        onNext={onNext}
        onPrevious={onPrevious}
        currentPage={listPagination?.meta?.current_page}
        lastPage={listPagination?.meta?.last_page}
      />

      {/* Trending Content */}
      {listWithImage.map((item, index) => (
        <div key={index} className='bg-white shadow-md rounded-lg p-4 mb-6'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-orange-600 font-bold'>
              Trending #{index + 1}
            </span>
            <span className='text-sm text-gray-500'>{item.category}</span>
          </div>
          <img
            src={
              item.image_url ??
              'https://via.placeholder.com/600x300?text=No+image'
            }
            alt='Trending'
            className='rounded-lg mb-4'
          />
          <h3 className='text-xl font-bold'>{item.title}</h3>
          <p className='text-gray-600 text-sm'>{item.content}</p>
        </div>
      ))}
      {listWithImage?.length < 1 && (
        <div className='text-orange-600 text-center'> List is Empty</div>
      )}

      {listWithImage?.length >= listPagination?.meta?.per_page && (
        <Pagination
          onNext={onNext}
          onPrevious={onPrevious}
          currentPage={listPagination?.meta?.current_page}
          lastPage={listPagination?.meta?.last_page}
        />
      )}
    </main>
  );
};

export default MainLayer;
