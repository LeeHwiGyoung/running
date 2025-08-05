'use client';
import React, { useState } from 'react'
import AuthInput from './AuthInput'
import Button from '../Button';
import { useSignup } from '@/hooks/useSignup';
import AuthHeader from './AuthHeader';
import LoadingSpinner from '../LoadingSpinner';

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
  
  
  return (
    <article className='relative h-[calc(100dvh-4rem)]'>
        <AuthHeader>
            <h1>회원가입</h1>
        </AuthHeader>
        <form 
         className='flex flex-col gap-4 items-center px-4'
         onSubmit={handleSubmit}
        >
          <AuthInput
           className='w-full'
           value={email}
           label={'이메일'}
           type={'email'}
           name={'email'}
           id={'email'}
           onChange={handleChangeEmail}
          />

          <AuthInput
           className='w-full'
           value={password}
           label={'패스워드'}
           type={'password'}
           name={'password'}
           id={'password'}
           onChange={handleChangePassword}
           />

          <AuthInput
           className='w-full'
           value={nickname}
           label={'닉네임'}
           type={'text'} 
           name={'nickname'}
           id={'nickname'}
           onChange={hanldleChangeNickname}
          />

          <Button className="text-2xl bg-black text-white rounded-full w-full py-2 mt-4" type='submit'>
            회원가입
          </Button>
         </form>
        {isLoading &&  <div className='fixed top-0 left-0 bg-black/50 w-full h-[100vh] z-10000'>
          <LoadingSpinner/>
        </div>}
    </article>
  )
}
