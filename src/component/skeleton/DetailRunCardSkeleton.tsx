import React from 'react';
// DetailRunCard와 유사한 모양의 스켈레톤 컴포넌트
export function DetailRunCardSkeleton() {
  return (
    <div className='flex flex-col gap-4 p-4 animate-pulse'>
      {/* 날짜 */}
      <div className='h-4 bg-gray-200 rounded w-1/4'></div>
      {/* 제목 */}
      <div className='h-8 bg-gray-200 rounded w-3/4'></div>
      {/* 거리 */}
      <div className='flex items-end text-5xl gap-1 mt-4'>
        <div className='h-12 bg-gray-200 rounded w-1/2'></div>
        <div className='h-6 bg-gray-200 rounded w-1/6'></div>
      </div>
      {/* 통계 섹션 (페이스, 시간) */}
      <div className='flex mt-4 gap-4'>
        <div className='flex-1 flex flex-col gap-2'>
          <div className='h-6 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-3/4'></div>
        </div>
        <div className='flex-1 flex flex-col gap-2'>
          <div className='h-6 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-3/4'></div>
        </div>
      </div>
    </div>
  );
}