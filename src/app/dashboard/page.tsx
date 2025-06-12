import RunCardList from '@/component/dashboard/RunCardList'
import Total from '@/component/dashboard/Total'
import React from 'react'


export default function page() {
  return (
    <>
      <header className="py-4">
        <h2 className="font-bold text-lg p-2">통계</h2>
      </header>
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
