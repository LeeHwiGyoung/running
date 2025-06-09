import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

interface BottomNavItemProps {
    href : string;
    label : string;
    isActive : boolean;
    imageSrc : string;
}

export default function BottomNavItem({href , label, imageSrc } : BottomNavItemProps) {
  
  return (
    <Link className='flex flex-col grow-1 items-center justify-center ' href={href}>
        <Image src={imageSrc} alt="" width={24} height={24}/>
        <span>{label}</span>
    </Link>
  )
}
