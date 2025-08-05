import Button from '@/component/Button'
import { DetailRunCardSkeleton } from '@/component/skeleton/DetailRunCardSkeleton'
import AuthHeader from '@/component/user/AuthHeader'
import React from 'react'

export default function loading() {
  return (
    <AuthHeader>
        <h1>러닝 결과</h1>
        <Button className='border rounded-full px-4 py-2 bg-black text-white text-sm ml-auto'>
            저장
        </Button>
        <DetailRunCardSkeleton/>
    </AuthHeader>
  )
}
