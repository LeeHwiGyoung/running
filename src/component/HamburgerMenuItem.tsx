import Link from 'next/link';
import React from 'react'

interface HamburgerMenuItemProps {
    text: string;
    href: string;
    onClick?: () => void;
}

export default function HamburgerMenuItem({text ,href, onClick} : HamburgerMenuItemProps) {
  return (
    <li role="menuitem" className='w-full'>
        <Link href={href} className='block p-3 w-full hover:bg-gray-100 text-center rounded-md' onClick={onClick}>
            {text}
        </Link>
    </li>
  )
}
