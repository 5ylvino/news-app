import React from 'react';
import { filterList } from '../utils/list-helpers';
import httpClient from '../service/client';
import { API_ENDPOINTS } from '../service/api-endpoints';
import { toast } from 'react-toastify';
import { useLogger } from '../utils/logger';

const RightSidebar = ({ data }) => {
  const { id } = useLogger();
  const list = filterList(
    data
      ?.map(news => {
        const _1000PerMinute = Math.round(news?.content?.length / 1000),
          readTime =
            !news?.content || _1000PerMinute === 0 ? 1 : _1000PerMinute;

        return {
          ...news,
          read_time: `${readTime} min read`,
          date: new Date(news?.publish_date).toDateString()
        };
      })
      ?.sort(function () {
        return 0.5 - Math.random();
      })
      ?.reverse()
      ?.slice(0, 10)
  );

  const handleOnSavePreference = inputData => {
    httpClient
      .post(API_ENDPOINTS.preference, { ...inputData, user_id: id })
      .then(response => {
        const data = response.data;

        if (!data?.error) {
          toast.success(data?.message);
        }
      })
      .catch(error => {
        toast.error(error?.message);
      });
  };

  return (
    <aside className='w-full lg:w-1/4 bg-white shadow-md rounded-lg p-4'>
      {/* Curated Picks */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-4'>Curated Picks</h3>
        {list.map((item, index) => (
          <div key={index} className='mb-4 flex justify-between items-start'>
            <div>
              <button
                className='bg-gray-200 text-xs p-1 rounded-lg hover:bg-gray-300 float-end'
                onClick={() =>
                  handleOnSavePreference({
                    author: item?.category?.toLowerCase(),
                    source: item?.source
                  })
                }>
                save
              </button>
              <p className='text-sm font-semibold line-clamp-2'>{item.title}</p>
              <p className='text-xs text-gray-500'>
                {item.date} ・ {item.read_time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
