import RunCardListFetcher from '@/component/dashboard/RunCardListFetcher'
import TotalFetcher from '@/component/dashboard/TotalFetcher'
import Header from '@/component/Header'
import AuthHeader from '@/component/user/AuthHeader'
import React from 'react'

export default async function page({searchParams}) {
  const searchParam = await searchParams;
  const week : 'current' | 'prev' = searchParam.week || 'current';
  return (
    <>
      <AuthHeader>
        <h1>통계</h1>
      </AuthHeader>
      <main className='mb-16'>
        <TotalFetcher week={week}/>
        <section>
          <Header>
            <h3>최근 활동</h3>
          </Header>  
          <RunCardListFetcher/> 
        </section>
      </main>
    </>
  )
}
