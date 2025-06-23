import React from 'react'

interface HeaderProps {
    className ?: string;
    children ?: React.ReactNode;
}
export default function Header(
    {children , className=""} : HeaderProps
) {
  return (
    <header className={`p-4 font-bold text-lg ${className}`}>
        {children}
    </header>
  )
}
