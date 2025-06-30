import React from 'react'
import HamburgerMenuItem from './HamburgerMenuItem'

interface MenuItem {
    id: string;
    text: string;
    href: string;
}

interface HamburgerMenuProps {
    items: MenuItem[]; // 동적으로 렌더링할 메뉴 항목 배열
    className?: string;
    onMenuItemClick?: () => void; // 메뉴 아이템 클릭 시 호출될 콜백
}

export default function HamburgerMenu({items , className , onMenuItemClick} : HamburgerMenuProps) {
  return (
    <nav className={`absolute top-8 left-[50%] translate-x-[-50%] border border-gray-200 shadow-lg z-100 min-w-[100px] w-fit ${className}`}>
        <ul className='flex flex-col items-center justify-center'>
            {items.map(item => (
                <HamburgerMenuItem
                    key={item.id}
                    text={item.text}
                    href={item.href}
                    onClick={onMenuItemClick} // 각 아이템 클릭 시 메뉴 닫기 콜백 전달
                />
            ))}
        </ul>
    </nav>
  )
}
