'use client'
import ReactDOM from 'react-dom'
import Button from './ui/Button';

interface ModalProps {
  className ?: string;
  children ?: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export default function Modal({ className, isOpen, onClose, children }: ModalProps) {
  if (typeof window === 'undefined') return null
  
  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot || !isOpen) return null

  return ReactDOM.createPortal(
      <div
        className={`fixed top-0 bg-white w-full h-[100vh]  ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        >
        <Button className='absolute right-[5%] top-[4%] z-100' onClick={onClose}>x</Button>
        {children}
      </div>
    ,
    modalRoot
  )
}
