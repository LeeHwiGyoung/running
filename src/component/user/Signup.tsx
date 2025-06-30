'use client';
import React, { useState } from 'react'
import AuthInput from './AuthInput'
import Button from '../Button';
import { useSignup } from '@/hooks/useSignup';
import AuthHeader from './AuthHeader';

export default function Signup() {
  const [email , setEmail] = useState<string>("");
  const [password , setPassword] = useState<string>("");
  const [nickname , setNickname] = useState<string>("");

  const { signup, isLoading} = useSignup();

  const handleChangeEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEmail(newValue);
  }

  const handleChangePassword = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setPassword(newValue);
  }

  const hanldleChangeNickname = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setNickname(newValue);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    signup({email, password , nickname});
  }
  
  if(isLoading) {
    return (
        <div>Loading...</div>
    )
  }

  

  return (
    <article className='relative h-[calc(100dvh-4rem)]'>
        <AuthHeader>
            <h1>회원가입</h1>
        </AuthHeader>
        <form 
         className='px-4'
         onSubmit={handleSubmit}
        >
          <AuthInput
           value={email}
           label={'이메일'}
           type={'email'}
           name={'email'}
           id={'email'}
           onChange={handleChangeEmail}
          />

          <AuthInput
           value={password}
           label={'패스워드'}
           type={'password'}
           name={'password'}
           id={'password'}
           onChange={handleChangePassword}
           />

          <AuthInput
           value={nickname}
           label={'닉네임'}
           type={'text'} 
           name={'nickname'}
           id={'nickname'}
           onChange={hanldleChangeNickname}
          />

          <Button className="absolute bottom-0 text-2xl bg-black text-white rounded-full w-full py-2 " type='submit'>
            회원가입
          </Button>
         </form>
    </article>
  )
}
