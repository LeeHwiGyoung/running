'use client';
import React from 'react'
import Button from '../Button'
import Image from 'next/image'


interface HamburgerButtonProps {
    className ?: string;
    toggleMenuDisplay : () => void;
}
export default function HamburgerButton({className= "" , toggleMenuDisplay} : HamburgerButtonProps) {
  return (
    <Button type='button' className={`${className}`} onClick={toggleMenuDisplay}>
        <Image src='/menu.svg' alt="메뉴" width={24} height={24} />
    </Button>
  )
}
