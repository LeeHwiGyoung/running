'use client';

import { usePathname } from 'next/navigation'
import React from 'react'
import BottomNavItem from '../ui/BottomNavItem';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {path : '/' , label : '러닝', isActive : pathname.startsWith('/')},
    {path : '/maraton' , label : "마라톤 정보" , isActive : pathname.startsWith('/maraton')},
    {path : '/dashboard' , label : "내 기록" , isActive : pathname.startsWith('/dashboard')}
  ]
  return (
    <nav className='fixed flex bottom-0 w-full border-t'>
      {navItems.map((navItem)=> <BottomNavItem key={navItem.path} href={navItem.path} label={navItem.label} isActive={navItem.isActive}/>)}
    </nav>
  )
}
