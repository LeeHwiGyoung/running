// TotalCategory.tsx
'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // useRouter와 useSearchParams import
import Button from '../Button';

interface TotalCategoryProps{
    position ?: 'left' | 'right';
    className ?: string;
}


export default function TotalCategory({position='left' , className=""} : TotalCategoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const week = searchParams.get('week') || 'current'; // 현재 URL의 week 값을 가져옴 (기본값 'current')

  const handleWeekChange = (newWeek: 'current' | 'prev') => {
    const params = new URLSearchParams(searchParams);
    params.set('week', newWeek);
    router.push(`?${params.toString()}`); // URL을 업데이트
  };

  return (
    <ul className={`flex text-black gap-2  ${position === 'left' ? 'justify-start' : 'justify-end'} ${className}`}>
      <li className={`border border-gray-200 p-1 rounded-md ${week==='prev' && 'bg-black'}`}>
        <Button
          className={`${week==='prev' && 'text-white'}`} 
          onClick={() => handleWeekChange('prev')} 
          disabled={week === 'prev'} // 현재 week가 'prev'면 버튼 비활성화
        >
          지난 주
        </Button>
      </li>
    <li className={`border border-gray-200 p-1 rounded-md ${week==='current' && 'bg-black'}`}>
        <Button 
          className={`${week==='current' && 'text-white'}`} 
          onClick={() => handleWeekChange('current')} 
          disabled={week === 'current'} // 현재 week가 'current'면 버튼 비활성화
        >
          이번 주
        </Button>
      </li>
    </ul>
  );
}