'use client';
import React from 'react'
import Button from '../ui/Button'

export default function RunningMenu() {
  const onClickRunningStart = () => {
    console.log('start 버튼 클릭 됨')
  }

  const onClickPlayList = () => {
    console.log('playList 클릭 됨')
  }

  return (
    <section className='flex'>
        <h3 className='sr-only'>러닝 메뉴</h3>
        <Button buttonName={"start"} onClick={onClickRunningStart}  />
        <Button buttonName='playList' onClick={onClickPlayList}  />
    </section>
  )
}
