import RunCardList from '@/component/dashboard/RunCardList'; // 기존 클라이언트 컴포넌트
import { NextCursor, RunningData } from '@/types/running.types';
import { headers } from 'next/headers';
import React from 'react';

// API 호출 로직을 async 함수로 분리
async function getRunningCardList() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/runCardList`,{
        credentials: 'include',
        cache: 'no-store',
        headers: {
        Cookie: (await headers()).get('cookie') || '',
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch runCardList');
    }
    
    const json = await res.json();
    return json;
}

export default async function RunCardListFetcher() {
    const data: { runs: RunningData[] , nextCursor : NextCursor } = await getRunningCardList();

    return <RunCardList initRunData={data.runs} initNextCursor={data.nextCursor}/>;
}