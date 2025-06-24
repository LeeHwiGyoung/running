'use client';

import { usePathname } from 'next/navigation'
import React from 'react'
import BottomNavItem from './BottomNavItem';
export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {path : '/' , label : '러닝', isActive : pathname === '/', imageSrc : '/running.svg'},
    {path : '/dashboard' , label : "내 기록" , isActive : pathname.startsWith('/dashboard'), imageSrc : '/dashboard.svg'}
  ]

  return (
    <nav className='fixed flex w-full left-0 bottom-0 border-t border-gray-300 z-1000 bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.5)]'>
      {navItems.map((navItem)=> <BottomNavItem key={navItem.path} href={navItem.path} label={navItem.label} isActive={navItem.isActive} imageSrc={navItem.imageSrc} activeColor='bg-stone-100'/>)}
    </nav>
  )
}
