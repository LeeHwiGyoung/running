import React, { useEffect, useRef, useState } from 'react'
import HamburgerButton from './HamburgerButton'
import HamburgerMenu from './HamburgerMenu'
import { useAuthStore } from '@/store/useAuthStore';
import useLogout from '@/hooks/useLogout';

interface HamburgerProps {
 buttonPosition : 'right' | 'left';
}


export default function Hamburger({buttonPosition = 'right' } : HamburgerProps) {
  const isLoggedin = useAuthStore((state) => state.isLoggedIn);
  const [isMenuOpen , setIsMenuOpen] = useState<boolean>(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const { logout } = useLogout();
  
  const loggedinMenu = [
    {id: 'logout', text : '로그아웃' , href : '/' , onClick : logout},
  ]
  
  const loggedoutMenu = [
    {id : 'login', text : '로그인' , href: '/login'},
    {id : 'signup', text : '회원가입' , href: '/signup'}
  ]

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        // hamburgerRef.current가 존재하고, 클릭된 요소가 hamburgerRef.current 내부에 포함되지 않는다면
        if (hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)) {
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
    <div className={`relative  ${buttonPosition==='right' ? 'ml-auto' : 'mr-auto'}`} 
      ref={hamburgerRef}>
        <HamburgerButton toggleMenuDisplay={toggleMenu} />
        {isMenuOpen && <HamburgerMenu items={isLoggedin ? loggedinMenu : loggedoutMenu}/>}
    </div>
  )
}
