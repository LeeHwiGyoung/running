'use client';

import { usePathname } from 'next/navigation'
import React from 'react'
import BottomNavItem from '../ui/BottomNavItem';
export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {path : '/' , label : '러닝', isActive : pathname.startsWith('/'), imageSrc : '/running.svg'},
    {path : '/dashboard' , label : "내 기록" , isActive : pathname.startsWith('/dashboard'), imageSrc : '/dashboard.svg'}
  ]

  return (
    <nav className='fixed flex w-full left-0 bottom-0 border-t z-100 bg-white'>
      {navItems.map((navItem)=> <BottomNavItem key={navItem.path} href={navItem.path} label={navItem.label} isActive={navItem.isActive} imageSrc={navItem.imageSrc}/>)}
    </nav>
  )
}
