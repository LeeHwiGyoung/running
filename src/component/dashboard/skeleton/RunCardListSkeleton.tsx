import React from 'react'
import RunCardSkeleton from './RunCardSkeleton'

export default function RunCardListSkeleton() {
   return (
    <ul className='flex flex-col gap-8 px-2'>
      <RunCardSkeleton />
      <RunCardSkeleton />
      <RunCardSkeleton />
    </ul>
   )
}
