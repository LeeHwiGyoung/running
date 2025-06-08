import Link from 'next/link'
import React from 'react'

interface BottomNavItemProps {
    href : string;
    label : string;
    isActive : boolean;
}

export default function BottomNavItem({href , label } : BottomNavItemProps) {
  
  return (
    <Link className='grow-1 border border-collapse' href={href}>
        <span>{label}</span>
    </Link>
  )
}
