import React from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '../service/api-endpoints';
import httpClient from '../service/client';
import withConditionLayout from '../components/withConditionLayout';
import { useLogger } from '../utils/logger';

const Preferences = () => {
  const { id } = useLogger();

  const { data, error, isLoading } = useSWR(
    `/${id}${API_ENDPOINTS.preferences}`,
    httpClient.get
  );
  const authorsList = data?.data?.data?.filter(item => item?.author);
  const categoryList = data?.data?.data?.filter(item => item?.source);

  return (
    <PreferenceView
      data={data}
      error={error}
      isLoading={isLoading}
      authors={authorsList}
      categories={categoryList}
    />
  );
};
const PreferencesLayer = ({ categories = [], authors = [] }) => {
  const navigate = useNavigate();

  const handleOnRemovePreference = item => {
    httpClient
      .delete(`${API_ENDPOINTS.preference}/${item?.id}`)
      .then(({ data }) => {
        if (!data?.error) {
          toast.success(data?.message);
          window.location.reload();
        } else if (!data?.error) {
          toast.info('Not available');
        }
      })
      .catch(error => {
        toast.error(error?.message);
      });
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <header className='text-center mb-8'>
          <button
            type='button'
            onClick={() => {
              navigate(-1);
            }}
            className='text-xl font-bold mb-2 float-start bg-orange-600 text-white rounded-lg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='size-6'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M15.75 19.5 8.25 12l7.5-7.5'
              />
            </svg>
          </button>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Preferences</h1>
          <p className='text-gray-600'>
            Displaying your preferred feed articles' titles and authors, from
            authors you follow and new content saved.
          </p>
        </header>

        {/* Responsive Grid Layout */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Users List */}
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
              Article title
            </h2>
            <ul>
              {categories.map((item, index) => (
                <li
                  key={index}
                  className='border-b border-gray-200 pb-4 mb-4 last:border-none last:mb-0'>
                  <div
                    className='text-sm text-gray-600 float-end cursor-pointer'
                    onClick={() => handleOnRemovePreference(item)}>
                    X
                  </div>
                  <p className='text-lg font-medium text-gray-800'>
                    {item.category}
                  </p>
                  <p className='text-sm text-gray-600'>{item.source}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Authors List */}
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
              Authors
            </h2>
            <ul>
              {authors.map((author, index) => (
                <li
                  key={index}
                  className='border-b border-gray-200 pb-4 mb-4 last:border-none last:mb-0'>
                  <div
                    className='text-sm text-gray-600 float-end cursor-pointer'
                    onClick={() => handleOnRemovePreference(author)}>
                    X
                  </div>
                  <p className='text-lg font-medium text-gray-800 capitalize'>
                    {author.author}
                  </p>
                  <p className='text-sm text-gray-600'>{author.source}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;

const PreferenceView = withConditionLayout(PreferencesLayer);
