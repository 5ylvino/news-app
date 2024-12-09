import React from 'react';
import { Link } from 'react-router-dom';
import { useLogger } from '../utils/logger';

const Header = () => {
  const { isLoggedIn } = useLogger();

  const onLogout = () => {
    window.localStorage.clear();
    window.location.replace('/');
  };
  return (
    <header className='flex flex-wrap justify-between items-center bg-white shadow-md rounded-lg p-4 mb-6'>
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
