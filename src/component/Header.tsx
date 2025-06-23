import React from 'react'

interface HeaderProps {
    className ?: string;
    children ?: React.ReactNode;
    borderBottomShadow ?: boolean;
}
export default function Header(
    {children , className="" , borderBottomShadow = false} : HeaderProps
) {
  return (
    <header className={`p-4 font-bold text-lg ${borderBottomShadow && `shadow-[0px_10px_10px_-10px_rgba(33,35,38,0.1)]`} ${className}`}>
        {children}
    </header>
  )
}
