
import RunCardListFetcher from '@/component/dashboard/RunCardListFetcher'
import Total from '@/component/dashboard/Total'
import Header from '@/component/Header'
import AuthHeader from '@/component/user/AuthHeader'
import React from 'react'


export default function page() {
  return (
    <>
      <AuthHeader>
        <h1>통계</h1>
      </AuthHeader>
      <main className='mb-16'>
        <Total/>
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
