'use client'
import ReactDOM from 'react-dom'
import Button from './Button';
import Image from 'next/image';

interface ModalProps {
  className ?: string;
  children ?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  defaultHeader ?: boolean;
}

export default function Modal({ className="", isOpen, onClose, children ,defaultHeader = false}: ModalProps) {
  if (typeof window === 'undefined') return null
  
  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot || !isOpen) return null

  return ReactDOM.createPortal(
      <div
        className={`fixed top-0 bg-white w-full h-[100vh] max-w-md ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        >
        {
          defaultHeader &&
          <Button className='absolute right-[5%] top-[4%] z-100' onClick={onClose}>
            <Image src='/close.svg' width={24} height={24} alt={''}/>
          </Button>
        }
        {children}
      </div>
    ,
    modalRoot
  )
}
