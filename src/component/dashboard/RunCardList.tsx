'use client';
import { usePathname, useRouter } from "next/navigation";
import RunCard from "./RunCard";
import { NextCursor, RunningData } from "@/types/running.types";
import { useCallback, useState } from "react";
import useScroll from "@/hooks/useScroll"
import RunCardSkeleton from "../skeleton/RunCardSkeleton";

interface RunCardListProps {
  initRunData : RunningData[];
  initNextCursor : NextCursor;
}

export default function RunCardList({initRunData ,initNextCursor} : RunCardListProps) {
  const router = useRouter();
  const pathname = usePathname()
  const [runningData , setRunningData] = useState<RunningData[]>(initRunData);
  const [cursor, setCursor] = useState<NextCursor>(initNextCursor);
  const [loading, setLoading] = useState<boolean>(false);

  const onClickRunCard = (id : number | string) => {
    router.push(`${pathname}/runningDetail/${id}`)
  }

  const getRunningCardList = async(nextCursor : NextCursor) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/runCardList?lastDocId=${nextCursor.lastDocId}&lastCreatedAt=${nextCursor.lastCreatedAt}`,{
          credentials: 'include',
      });
  
      if (!res.ok) {
          throw new Error('Failed to fetch runCardList');
      }
      
      const json = await res.json();

      return json;
  }

  const loadMoreRunData = useCallback(async() => {
    if(loading || !cursor) return; //로딩중이거나 가져올 데이터가 없다면 return;
    setLoading(true);
    try {
      const {runs : newRunData, nextCursor }= await getRunningCardList(cursor); // 여기서 fetch;
      
      if(newRunData.length > 0) { // 추가 데이터가 있다면
        setRunningData(prevRunningData => [...prevRunningData, ...newRunData]);
        setCursor(nextCursor);
      }else {
        setCursor(null)
      }
    }catch(error){ 
      console.error('failed Fetch RunningData' , error)
    }finally{
      setLoading(false)
    }
  }, [loading, cursor])

  const setObserverRef = useScroll({
    onIntersect : (entries) => {
      //뷰포트에 마지막 요소가 보이면
      if(entries[0].isIntersecting) {
        loadMoreRunData()
      }
    }, options : {
      root :null,
      rootMargin : '0px',
      threshold : 0.5,
    }
  })

  return (
      <ul className='flex flex-col gap-8 px-2'>
          {runningData.map((runData,index)=> {
            const isLastRunningData = runningData.length === index + 1;
            return (
              <li key={runData.id} ref={isLastRunningData ? setObserverRef : null}>  {/*  콜백 ref 이용 node를 콜백 인수로 받는 콜백 함수 사용 가능 */}
                  <RunCard onClick={() => onClickRunCard(runData.id)} date={runData.date} title={runData.runTitle} distance={runData.totalDistance} distanceLabel={'Km'} runningPace={runData.avgPace} runningTime={runData.totalRunningTimeSecond}/>
              </li>
            )
          })}     
          {loading && (
            <li className="relative">
              <RunCardSkeleton/>
            </li>
          )}
      </ul>
  )
}
