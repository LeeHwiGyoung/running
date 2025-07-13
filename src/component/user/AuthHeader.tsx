'use client';
import React from 'react'
import Header from '../Header'
import Hamburger from '../hamburgers/Hamburger';


interface AuthHeaderProps {
    children ?: React.ReactNode;
    menuPosition ?: "left" | "right";
    className ?: string;
}

export default function AuthHeader({children , menuPosition = 'right', className = ""} : AuthHeaderProps) {

  return (
    <Header className={`flex items-center z-10000 ${className}`}>
        {children}
        <Hamburger buttonPosition={menuPosition} />
    </Header>
  )
}
