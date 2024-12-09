import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLogger } from '../utils/logger';
import { useTransporter } from '../utils/action.context';
import { sideBarTargets } from '../constants/transport-targets';

const Header = () => {
  const location = useLocation();
  const { isLoggedIn } = useLogger();
  const { send } = useTransporter();
  const screen = location.pathname?.replace(/(\/)/gi, '');
  const target = sideBarTargets[screen] ?? sideBarTargets.main;
  const isAllowedMenuOnScreen = sideBarTargets[screen] || !screen;

  const onLogout = () => {
    window.localStorage.clear();
    window.location.replace('/');
  };
  return (
    <header className='flex flex-wrap justify-between items-center bg-white shadow-md rounded-lg p-4 mb-6'>
      {isAllowedMenuOnScreen && (
        <span
          className='block md:hidden text-xl text-gray-500 font-bold cursor-pointer'
          onClick={() => send({ payload: true, target })}>
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
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
        </span>
      )}
      <Link to='/' className='text-sm md:text-2xl font-bold text-orange-600'>
        Innoscripta News
      </Link>
      <div className='space-l-4 md:space-x-4'>
        {isLoggedIn ? (
          <button
            type='button'
            onClick={onLogout}
            className='text-xs md:text-sm text-gray-600 hover:text-orange-600'>
            Logout
          </button>
        ) : (
          <>
            <Link
              to='/login'
              className='text-xs md:text-sm text-gray-600 hover:text-orange-600'>
              Login
            </Link>
            <Link
              to='/register'
              className='text-xs md:text-sm text-gray-600 hover:text-orange-600 pl-2 md:pl-4'>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
