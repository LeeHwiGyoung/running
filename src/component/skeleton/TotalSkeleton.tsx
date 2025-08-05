// @/component/dashboard/skeleton/TotalSkeleton.tsx

import React from 'react';
import RunningInfoSkeleton from './RunningInfoSkeleton';
import BarGraphSkeleton from './BarGraphSkeleton';

export default function TotalSkeleton() {
  return (
    <section className='relative px-2'>
      <h2 className='sr-only'>총 러닝 통계</h2>
      <RunningInfoSkeleton />
      <BarGraphSkeleton />
    </section>
  );
}