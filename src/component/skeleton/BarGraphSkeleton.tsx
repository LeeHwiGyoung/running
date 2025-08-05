// @/component/dashboard/skeleton/BarGraphSkeleton.tsx

import React from 'react';

export default function BarGraphSkeleton() {
  return (
    <div className='mt-8 animate-pulse'>
      {/* 그래프 영역 */}
      <div className='w-full h-48 bg-gray-200 rounded-md mb-2'></div>
      {/* x축 라벨 영역 */}
      <div className='flex justify-between px-4'>
        <div className='h-4 bg-gray-200 rounded w-1/12'></div>
        <div className='h-4 bg-gray-200 rounded w-1/12'></div>
        <div className='h-4 bg-gray-200 rounded w-1/12'></div>
        <div className='h-4 bg-gray-200 rounded w-1/12'></div>
        <div className='h-4 bg-gray-200 rounded w-1/12'></div>
        <div className='h-4 bg-gray-200 rounded w-1/12'></div>
        <div className='h-4 bg-gray-200 rounded w-1/12'></div>
      </div>
    </div>
  );
}