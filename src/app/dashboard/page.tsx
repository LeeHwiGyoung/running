import RunCardList from '@/component/dashboard/RunCardList'
import Total from '@/component/dashboard/Total'
import Header from '@/component/Header'
import React from 'react'


export default function page() {
  return (
    <>
      <Header>
        통계
      </Header>
      <main className='mb-16'>
        <section>
            <Total/>
        </section>
        <section className='space-y-4'>
            <h3>최근 활동</h3>
            <RunCardList /> 
        </section>
      </main>
    </>
  )
}
