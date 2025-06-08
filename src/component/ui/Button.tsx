'use client';
import React from 'react'

interface ButtonProps {
    buttonName : string;
    onClick : () => void;
}
export default function Button({buttonName, onClick} : ButtonProps) {
  const onClickBtn = () => {
    onClick();
  }
  return (
    <button className='flex justify-center items-center w-1/3  border max-w-xl cursor-pointer rounded-md' onClick={onClickBtn}>
        {buttonName}
    </button>
  )
}
