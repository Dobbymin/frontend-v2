'use client'

import { useEffect } from 'react'

import { ACCESS_ERROR_MESSAGE } from '@/constant/errorMessage'
import { useMyInfoStore } from '@/store/myInfo'

import { CreateEventPostForm, CreateEventPostHero } from './_components'

const CreateEventPost = () => {
  const { role } = useMyInfoStore((state) => state.myInfo)

  useEffect(() => {
    if (role !== 'ROLE_ADMIN') {
      throw new Error(ACCESS_ERROR_MESSAGE.UNAUTHORIZED_ERROR)
    }
  }, [role])

  return (
    <div className="flex flex-col gap-6">
      <CreateEventPostHero />
      <CreateEventPostForm />
    </div>
  )
}

export default CreateEventPost
