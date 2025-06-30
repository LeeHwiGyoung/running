'use client';
import React, { useState } from 'react'
import Header from '../Header'
import AuthInput from './AuthInput'
import Button from '../Button';
import { useLogin } from '@/hooks/useLogin';

export default function Login() {
  const [email , setEmail] = useState<string>("");
  const [password , setPassword] = useState<string>("");
  const {isLoading , login ,error} = useLogin()
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
  
  if(isLoading) {
    return (
      <div>Loading</div>
    );
  }
  
  if(error){
    return <div>{error}</div>
  }

  return (
    <article className='relative h-[calc(100dvh-4rem)]'>
        <Header>
            <h1>로그인</h1>
        </Header>
        <form className='px-4' onSubmit={handleLogin}>
          <AuthInput
          value={email}
          label={'이메일'}
          type={'email'}
          name={'email'}
          id={'email'}
          onChange={handleChangeEmail}/>

          <AuthInput
          value={password}
          label={'패스워드'}
          type={'password'}
          name={'password'}
          id={'password'}
          onChange={handleChangePassword}/>

          <Button className="absolute bottom-0 text-2xl bg-black text-white rounded-full w-full py-2 " type='submit'>
            로그인
          </Button>
         </form>
    </article>
  )
}
