'use client'; // 이 컴포넌트는 클라이언트에서 렌더링됩니다.

import { useRouter } from 'next/navigation'; // next/navigation에서 useRouter 임포트
import React from 'react';
import Button from './Button';

export default function BackButton() {
  const router = useRouter(); // useRouter 훅 초기화

  const handleGoBack = () => {
    router.back(); // 브라우저의 이전 히스토리로 이동합니다.
  };

  return (
    <Button
      onClick={handleGoBack}
      className=""
    >
    뒤로 가기
    </Button>
  );
}