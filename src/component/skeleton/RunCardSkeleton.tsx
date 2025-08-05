import React from 'react'

export default function RunCardSkeleton() {
  return (
    <div className=' border border-gray-200 rounded-lg shadow-[0px_1px_4px_rgba(0,0,0,0.16)]'>
        <div className='animate-pulse flex flex-col gap-4 p-4'>
            <div className='h-6 bg-gray-200 rounded w-3/4'></div>
            <div className='h-4 bg-gray-200 rounded w-1/4'></div>
            <div className='flex gap-4'>
                <div className='h-4 bg-gray-200 rounded w-1/3 py-8'></div>
                <div className='h-4 bg-gray-200 rounded w-1/3 py-8'></div>
                <div className='h-4 bg-gray-200 rounded w-1/3 py-8'></div>
            </div>
        </div>
    </div>
  )
}
