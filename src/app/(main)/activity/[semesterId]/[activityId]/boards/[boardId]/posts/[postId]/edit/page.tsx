'use client'

import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import {
  ACCESS_ERROR_MESSAGE,
  DATA_ERROR_MESSAGES,
} from '@/constant/errorMessage'
import { boardQueries } from '@/service/api'
import { useMyInfoStore } from '@/store/myInfo'
import { Role } from '@/types/user'

import { EditActivityPostForm } from './components/form/Form'
import { EditActivityPostHero } from './components/hero/Hero'

type EditPostPageParams = {
  params: {
    activityId: string
    boardId: string
  }
}

const EditActivityPostPage = ({ params }: EditPostPageParams) => {
  const { data: board, status } = useQuery(
    boardQueries.detail({
      activityId: Number(params.activityId),
      boardId: Number(params.boardId),
    }),
  )

  const { role } = useMyInfoStore((state) => state.myInfo)

  useEffect(() => {
    if (!role?.includes(role as Role)) {
      throw new Error(ACCESS_ERROR_MESSAGE.UNAUTHORIZED_ERROR)
    }
  }, [role])

  if (status === 'pending') return <div />

  if (!board) throw new Error(DATA_ERROR_MESSAGES.BOARD_DETAIL_NOT_FOUND)

  return (
    <div className="flex flex-col gap-6 py-10">
      <EditActivityPostHero boardName={board.boardName} />
      <EditActivityPostForm boardId={Number(params.boardId)} />
    </div>
  )
}

export default EditActivityPostPage
