import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLogger } from '../utils/logger';
import { filterList, filterListOfAuthor } from '../utils/list-helpers';
import httpClient from '../service/client';
import { API_ENDPOINTS } from '../service/api-endpoints';
import { toast } from 'react-toastify';
import { categoryLinks, navigationLinks } from '../constants/menu';
import { useTransporter } from '../utils/action.context';
import { sideBarTargets } from '../constants/transport-targets';

const LeftSidebar = ({ data }) => {
  const location = useLocation();
  const { email, first_name, isLoggedIn, id } = useLogger();
  const { payload, target, close } = useTransporter();

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

  const authors = filterListOfAuthor(list);

  const handleOnSavePreference = inputData => {
    httpClient
      .post(API_ENDPOINTS.preference, { ...inputData, user_id: id })
      .then(({ data }) => {
        if (!data?.error) {
          toast.success(data?.message);
        }
      })
      .catch(error => {
        toast.error(error?.message);
      });
  };

  return (
    <aside
      className={
        payload && target === sideBarTargets.main
          ? 'w-full lg:w-1/4 bg-white shadow-md rounded-lg p-4 mb-6 lg:mb-0 lg:mr-4 bg-[rgba(0,0,0,0.2)] fixed inset-0  md:relative md:inset-full h-screen'
          : 'hidden md:block w-full lg:w-1/4 bg-white shadow-md rounded-lg p-4 mb-6 lg:mb-0 lg:mr-4'
      }>
      <span
        className='block md:hidden text-xl text-gray-500 font-bold cursor-pointer float-end'
        onClick={close}>
        X
      </span>
      {isLoggedIn && (
        <div className='flex items-center mb-6'>
          <img
            src='https://via.placeholder.com/50'
            alt='Profile'
            className='rounded-full w-12 h-12'
          />
          <div className='ml-4'>
            <p className='font-semibold'>{first_name}</p>
            <p className='text-sm text-gray-500'>{email}</p>
          </div>
        </div>
      )}

      {/* navigation */}
      <ul className='border-b border-gray-300 mb-4'>
        {navigationLinks.map((link, index) => (
          <li
            key={index}
            className={`mb-2 font-medium ${
              location.pathname === link.path
                ? 'text-orange-700'
                : 'text-gray-700 hover:text-gray-500'
            }`}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>

      {/* Categories */}
      <div className='mb-6'>
        <h3
          className={`text-lg font-semibold mb-4 ${
            location.pathname?.includes('category')
              ? 'text-orange-700'
              : 'text-gray-700 hover:text-gray-500'
          }`}>
          Categories
        </h3>
        <div className='flex flex-wrap gap-2'>
          {categoryLinks.map((category, index) => (
            <Link to={`/category?q=${category.path}`}>
              <button
                key={index}
                className='bg-gray-200 text-sm px-4 py-1 rounded-full hover:bg-gray-300'>
                {category.name}
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Follows */}
      {authors?.length > 0 && (
        <div>
          <h3 className='text-lg font-semibold mb-4'>Recommended Follows</h3>
          {authors.map((item, index) => (
            <div
              key={index}
              className='flex justify-between items-center mb-4'
              onClick={() => {
                handleOnSavePreference(item);
                close();
              }}>
              <p className='text-sm capitalize w-2/3'>{item?.author}</p>
              <button className='text-sm text-orange-600 font-bold'>
                Follow +
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default LeftSidebar;
