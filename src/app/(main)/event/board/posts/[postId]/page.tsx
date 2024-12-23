'use client'

import { Suspense } from 'react'

import { PostQuries } from '@/servicetest/api/post'
import { useQuery } from '@tanstack/react-query'

import { Spinner } from '@/components/common'
import { BoardNavigationButton, PostContent } from '@/components/feature'

import { EventPostDetail, EventPostHero } from './_components'

type EventPostPageParams = {
  params: {
    postId: string
  }
}

const EventPostPage = ({ params }: EventPostPageParams) => {
  const { data: post, status } = useQuery(
    PostQuries.detail(Number(params.postId)),
  )

  if (status === 'pending') return <Spinner />

  if (!post) return <div>게시글 정보가 없습니다.</div>

  return (
    <div>
      <EventPostHero />
      <Suspense fallback={<div>loading...</div>}>
        <EventPostDetail post={post} />
        <PostContent content={post.postContent} />
        <BoardNavigationButton />
      </Suspense>
    </div>
  )
}

export default EventPostPage
