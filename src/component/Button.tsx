'use client';
import React from 'react'

interface ButtonProps {
    children ?: React.ReactNode;
    onClick ?: () => void;
    className ?: string;
    type ?: 'button' | 'submit' | 'reset';
}
export default function Button({children, onClick , className="", type = 'button'} : ButtonProps) {
  const baseClassName = 'flex justify-center items-center cursor-pointer ';
  const lastClassName = baseClassName + className;
  
  const onClickBtn = () => {
    onClick();
  }

  return (
    <button className={lastClassName} onClick={onClickBtn} type={type}>
        {children}
    </button>
  )
}
