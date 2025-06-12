'use client';
import React from 'react'

interface ButtonProps {
    children ?: React.ReactNode;
    onClick : () => void;
    className ?: string;
}
export default function Button({children, onClick , className} : ButtonProps) {
  const baseClassName = 'flex justify-center items-center cursor-pointer ';
  const lastClassName = baseClassName + className;
  
  const onClickBtn = () => {
    onClick();
  }

  return (
    <button className={lastClassName} onClick={onClickBtn}>
        {children}
    </button>
  )
}
