import React from 'react'
import Total from './Total'
import { headers } from 'next/headers';
import { RunningData } from '@/types/running.types';

interface TotalFetcherProps {
    week : 'current' | 'prev';
}

async function getTotalRunData(week : 'prev' | 'current') {    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/total?week=${week}` , {
          credentials: 'include',
          cache: 'no-store',
          headers: {
            Cookie: (await headers()).get('cookie') || '',
          },
      });

      if(!res.ok) {
        throw new Error('Failed to fetch totalRunData');
      }

      const json = await res.json();
      return json;
}

export default async function TotalFetcher({week} : TotalFetcherProps) {
 const totalData: {total : RunningData[] }  = await getTotalRunData(week);
 return (
    <Total initData={totalData.total}/>
  )
}
