//useScroll.ts
'use client';

import { useCallback, useEffect, useState } from "react";

type ScrollOptions = {
    root?: Element | Document | null;//observer가 감지할 뷰포트
    rootMargin ?: string, //root 의 여백
    threshold ?: number, //콜백이 실행되어야 하는 대상의 가시성 백분율
}

interface useScrollProps {
    onIntersect : (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;
    options ?: ScrollOptions,
}
export default function useScroll({onIntersect , options } : useScrollProps) {
  const [target , setTarget] = useState<HTMLElement | null>(null);//관찰 대상

  const callback = useCallback((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    onIntersect(entries, observer);
  }, [onIntersect]);

  useEffect(()=> {
    if(!target) return; //관찰 대상이 없으면 return;

    const observerOptions = options || {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(callback , observerOptions); 
    observer.observe(target);

    return () => {
        observer.disconnect();
    }
  }, [callback, options, target])

  return setTarget;
}
