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
  placeholder ?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

export default function AuthInput({className , labelStyle , value , onChange , type , label , name , id ,placeholder} : AuthInputProps) {

  return (
    <div className={`${className}`}>
        <label className={labelStyle} htmlFor={id}>{label}</label>
        <input 
          className={`w-full border-2 border-gray-400 rounded-md p-2`}
          name={name}
          id={id}
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
    </div>
  )
}
