'use client';
import React from 'react'

interface ButtonProps {
    children ?: React.ReactNode;
    onClick ?: React.MouseEventHandler<HTMLButtonElement>;
    className ?: string;
    type ?: 'button' | 'submit' | 'reset';
    disabled ?: boolean;
}
export default function Button({children, onClick , className="", type = 'button' , disabled=false} : ButtonProps) {
  const baseClassName = 'flex justify-center items-center cursor-pointer ';
  const lastClassName = baseClassName + className;
  
  const onClickBtn = (event : React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  }

  return (
    <button className={lastClassName} onClick={onClickBtn} type={type} disabled={disabled}>
        {children}
    </button>
  )
}
