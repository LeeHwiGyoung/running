// app/loading.tsx

import React from 'react';
import AuthHeader from '@/component/user/AuthHeader';
import Header from '@/component/Header';
import RunCardListSkeleton from '@/component/skeleton/RunCardListSkeleton';
import TotalSkeleton from '@/component/skeleton/TotalSkeleton';

export default function Loading() {
  return (
    <>
      <AuthHeader>
        <h1>통계</h1>
      </AuthHeader>
      <main className='mb-16'>
        <TotalSkeleton />
        <section>
          <Header>
            <h3>최근 활동</h3>
          </Header>
          <RunCardListSkeleton />
        </section>
      </main>
    </>
  );
}