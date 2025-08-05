import Login from '@/component/user/Login'
import { headers } from 'next/headers';
import React from 'react'

export default async function page() {
  const headersList = await headers();
  const referer = headersList.get('referer') || "/"

  return (
    <Login redirectUrl={referer}/>
  )
}
