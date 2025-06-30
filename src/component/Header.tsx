import React, { forwardRef } from 'react'

interface HeaderProps {
    className ?: string;
    children ?: React.ReactNode;
    borderBottomShadow ?: boolean;
}
const Header = forwardRef<HTMLDivElement, HeaderProps>(({ children, className = "" , borderBottomShadow = false}, ref) => {
  return (
    <header ref={ref} className={`p-4 font-bold text-lg ${borderBottomShadow && `shadow-[0px_10px_10px_-10px_rgba(33,35,38,0.1)]`} ${className}`}>
        {children}
    </header>
  )
});

Header.displayName = 'Header';
export default Header;