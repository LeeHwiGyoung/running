'use client';
import React, { useState } from 'react'
import AuthInput from './AuthInput'
import Button from '../Button';
import { useLogin } from '@/hooks/useLogin';
import AuthHeader from './AuthHeader';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../LoadingSpinner';

interface LoginProps {
  redirectUrl : string;
}
export default function Login({redirectUrl} : LoginProps) {
  const [email , setEmail] = useState<string>("");
  const [password , setPassword] = useState<string>("");
  const {isLoading , login ,error} = useLogin({redirectUrl})
  const router = useRouter();

  const handleChangeEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEmail(newValue);
  }

  const handleChangePassword = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setPassword(newValue);
  }

  const handleLogin = async(event : React.FormEvent) => {
    event.preventDefault();
    await login({email, password});
   
  }

  const handleSignUp = (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push('/signup')
  }
  
  
  if(error){
    return <div>{error}</div>
  }

  return (
    <article className='relative h-[calc(100dvh-4rem)]'>
        <AuthHeader>
            <h1>로그인</h1>
        </AuthHeader>
        <form className='flex flex-col gap-4 items-center px-4' onSubmit={handleLogin}>
          <AuthInput
          className='w-full'
          value={email}
          label={'이메일'}
          type={'email'}
          name={'email'}
          id={'email'}
          placeholder='이메일을 입력해주세요.'
          onChange={handleChangeEmail}/>

          <AuthInput
          className='w-full'
          value={password}
          label={'패스워드'}
          type={'password'}
          name={'password'}
          id={'password'}
          placeholder='패스워드를 입력해주세요.'
          onChange={handleChangePassword}/>

          <Button className="text-2xl bg-black text-white rounded-full w-full py-2 mt-4" type='submit'>
            로그인
          </Button>
          <Button className='text-2xl bg-white text-black rounded-full w-full py-2 mt-4 border' type='button' onClick={handleSignUp}>
            회원 가입
          </Button>
         </form>
         {isLoading &&  <div className='fixed top-0 left-0 bg-black/50 w-full h-[100vh] z-10000'>
            <LoadingSpinner/>
          </div>}
    </article>
  )
}
