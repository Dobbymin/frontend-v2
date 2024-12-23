'use client'

import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { PaginationButtons, Spinner } from '@/components/common'
import { PostTable } from '@/components/feature'
import { DATA_ERROR_MESSAGES } from '@/constant/errorMessage'
import { queryClient } from '@/lib/query-client'
import { PostQuries } from '@/service/api'

export const NoticePostListSection = () => {
  const postType = 'NOTICE'

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const page =
    Number(params.get('page')) > 0 ? Number(params.get('page')) - 1 : 0

  const { data, status, isPlaceholderData } = useQuery(
    PostQuries.list({ postType, page }),
  )

  useEffect(() => {
    if (!isPlaceholderData && data?.nextPageToken) {
      queryClient.prefetchQuery(PostQuries.list({ postType, page }))
    }
  }, [data, isPlaceholderData, page])

  if (status === 'pending') return <Spinner />

  if (!data) {
    throw new Error(DATA_ERROR_MESSAGES.POST_NOT_FOUND)
  }

  if (!data.posts.length) {
    return (
      <div className="flex flex-col items-center gap-6">
        <PostTable
          posts={data.posts}
          pageNumber={page}
          pageSize={data.pageInfo.pageSize}
        />
        <div>게시글이 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <PostTable
        posts={data.posts}
        pageNumber={page}
        pageSize={data.pageInfo.pageSize}
      />
      <PaginationButtons data={data} />
    </div>
  )
}
