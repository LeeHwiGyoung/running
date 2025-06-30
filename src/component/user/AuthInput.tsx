'use client';
import React from 'react'
interface AuthInputProps {
  className ?: string;
  labelStyle ?: string;
  value : string;
  label : string;
  type : "email" | "password" | "text"
  name : string;
  id : string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

export default function AuthInput({className , labelStyle , value , onChange , type , label , name , id} : AuthInputProps) {

  return (
    <div>
        <label className={labelStyle} htmlFor={id}>{label}</label>
        <input 
          className={`w-full border-b-2 border-gray-400 p-2 ${className}`}
          name={name}
          id={id}
          type={type}
          onChange={onChange}
          value={value}
        />
    </div>
  )
}
