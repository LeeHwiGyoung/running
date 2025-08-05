// @/component/dashboard/skeleton/RunningInfoSkeleton.tsx

import React from 'react';

export default function RunningInfoSkeleton() {
  return (
    <article className='flex w-full text-center py-4 rounded-sm border-gray-100 border shadow-[0px_2px_5px_rgba(0,0,0,0.1)] animate-pulse'>
      {/* 횟수 스켈레톤 */}
      <div className='grow-1 flex flex-col items-center'>
        <div className='h-6 bg-gray-200 rounded w-1/2 mb-2'></div>
        <div className='h-4 bg-gray-200 rounded w-1/4'></div>
      </div>
      {/* 거리 스켈레톤 */}
      <div className='grow-1 flex flex-col items-center'>
        <div className='h-6 bg-gray-200 rounded w-1/2 mb-2'></div>
        <div className='h-4 bg-gray-200 rounded w-1/4'></div>
      </div>
      {/* 시간 스켈레톤 */}
      <div className='grow-1 flex flex-col items-center'>
        <div className='h-6 bg-gray-200 rounded w-1/2 mb-2'></div>
        <div className='h-4 bg-gray-200 rounded w-1/4'></div>
      </div>
    </article>
  );
}