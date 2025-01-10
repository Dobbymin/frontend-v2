'use client'

import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui'
import { useMyInfoStore } from '@/store/myInfo'

export const CreateNoticePostButton = () => {
  const pathName = usePathname()
  const router = useRouter()

  const { role } = useMyInfoStore((state) => state.myInfo)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(!(role === 'ROLE_ADMIN'))
  }, [role])

  if (disabled) return null

  return (
    <Button
      onClick={() => router.push(`${pathName}/create-post`)}
      disabled={disabled}
    >
      공지사항 작성하기
    </Button>
  )
}
