import { useRunningStore } from '@/store/useRunningStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import Button from './Button';

interface BottomNavItemProps {
    href : string;
    label : string;
    isActive : boolean;
    imageSrc : string;
    activeColor : string;
}

export default function BottomNavItem({href , label, imageSrc , isActive , activeColor } : BottomNavItemProps) {
  const router = useRouter();
  const {isTracking} = useRunningStore();

  const handleClick = () => {
    // 러닝 탭일 때만 조건 적용
    if (href === '/' && isTracking) {
      router.push('/tracking');
    } else {
      router.push(href);
    }
  };

  return (
    <Button className={`flex flex-col grow-1 items-center justify-center ${isActive && activeColor}`} onClick={handleClick}>
        <Image src={imageSrc} alt="" width={24} height={24}/>
        <span>{label}</span>
    </Button>
  )
}
