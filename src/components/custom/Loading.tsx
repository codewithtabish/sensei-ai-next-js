/** @format */
// 'use client'
import React from 'react';

const Loader = () => {
  return (
    <div className='flex w-full items-center justify-center min-h-screen'>
      <div className='animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500 border-t-transparent'></div>
    </div>
  );
};

export default Loader;
