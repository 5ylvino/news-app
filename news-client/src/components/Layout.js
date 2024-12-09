import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {

  return (
    <div className='min-h-screen bg-white font-sans'>
      <div className='container mx-auto p-4'>
        <Header />

        {children}
      </div>
    </div>
  );
};

export default Layout;
