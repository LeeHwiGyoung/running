'use client';
import { formatPace, formatTime } from '@/utils/format'
import React, { useEffect, useRef, useState } from 'react'
import useCountUp from '@/hooks/useCountUp'
import Button from '../Button';
import Image from 'next/image';

interface DetailRunCardProps {
    date: string,
    title : string,
    distance : number,
    distanceLabel : string,
    runningPace : number,
    runningTime : number,
    cadence : number,
    isEditable ?: boolean,
    handleChangeTitle ?: (newTitle : string) => void;
}

export default function DetailRunCard({
    date,
    title,
    distance,
    distanceLabel,
    runningPace,
    runningTime,
    cadence,
    isEditable = false,
    handleChangeTitle,
}:DetailRunCardProps) {
  const count = useCountUp({target : distance})
  const [isEdit , setIsEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(title);
  const titleRef = useRef<HTMLInputElement|null>(null); 

  const handleEditTitleBtn = () => {
    setIsEdit(true);
  }

  const handleCheckTitleBtn = () => {
    if(!editTitle) { 
     alert('제목을 입력해주세요');
     return   
    }
    setIsEdit(false);
    handleChangeTitle((editTitle))
  }

  const handleEditTile = (event : React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  }

  useEffect(()=> {
    if(isEdit === true) {
        titleRef.current.focus();
    }
  }, [isEdit])

  return (
    <article className='flex flex-col gap-2 px-4'>
        {
            (isEditable  && isEdit) ? 
            <div className='flex border-b-2 border-gray-200'>
                <label className='sr-only' htmlFor="title">러닝 제목</label>
                <input
                ref={titleRef}
                id="title"
                name='title'
                className='font-bold text-xl py-2 grow-1'
                type='text'
                onChange={handleEditTile}
                value={editTitle} />
                <Button className='ml-auto' onClick={handleCheckTitleBtn}>
                    <Image src={'/check.svg'} alt={'제목 수정 완료'} width={24} height={24}/>
                </Button>
                </div>
            :
            <h2 className='flex text-xl font-bold border-gray-200 border-b-2 py-2'>
                {title}
                {isEditable && (
                    <Button className='ml-auto' onClick={handleEditTitleBtn}>
                        <Image src={'/edit.svg'} alt={'제목 수정'} width={24} height={24}/>
                    </Button>
                )}
            </h2>
        }
        <time className='text-gray-400' dateTime={date}>{date}</time> 
        <div className='flex items-end text-5xl gap-1'>
            <data className="font-bold" value={distance}>{count.toFixed(2).toLocaleString()}</data>
            <span className='text-2xl'>{distanceLabel}</span>
        </div>
        <section className='flex'>
            <h3 className='sr-only'>러닝 통계</h3>
            <div className='flex flex-col grow-1'>
                <data className="text-xl font-bold" value={runningPace}>{formatPace(runningPace)}</data>
                <span>평균 페이스</span>
            </div>
            <div className='flex flex-col grow-1'>
                <data className="text-xl font-bold" value={runningTime}>{formatTime(runningTime)}</data>
                <span>시간</span>
            </div>
            <div className='flex flex-col grow-1'>
                <data className="text-xl font-bold" value={cadence}>{cadence}</data>
                <span>케이던스</span>
            </div>
        </section>
    </article>
  )
}
