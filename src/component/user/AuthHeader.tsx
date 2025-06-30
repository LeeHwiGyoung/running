'use client';

import React, { useEffect, useRef, useState } from 'react'
import Header from '../Header'
import HamburgerButton from '../HamburgerButton'
import HamburgerMenu from '../HamburgerMenu';


const loggedInMenuItems = [
    { id: 'myinfo', text: '내 정보', href: '/profile' },
    { id: 'logout', text: '로그아웃', href: '/logout' }, // 실제 로그아웃 처리 로직 필요
];

// 로그아웃 시 메뉴 아이템
const loggedOutMenuItems = [
    { id: 'signup', text: '회원가입', href: '/signup' },
    { id: 'login', text: '로그인', href: '/login' },
];

interface AuthHeaderProps {
    children ?: React.ReactNode;
    menuPosition ?: "left" | "right";
    className ?: string;
}
export default function AuthHeader({children , menuPosition = 'right', className = ""} : AuthHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null); // 외부 클릭 감지를 위한 Ref

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        // headerRef.current가 존재하고, 클릭된 요소가 headerRef.current 내부에 포함되지 않는다면
        if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };

    if (isMenuOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    } else {
        document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <Header className={`flex items-center z-10000 ${className}`} ref={headerRef}>
        {children}
        <div className={`relative  ${menuPosition ? 'ml-auto' : 'mr-auto'}`}>
            <HamburgerButton toggleMenuDisplay={toggleMenu} />
            {isMenuOpen && 
            <HamburgerMenu items={loggedOutMenuItems} onMenuItemClick={()=> console.log('클릭')}/>}
        </div>
    </Header>
  )
}
