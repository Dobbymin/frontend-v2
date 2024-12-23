'use client'

import { useForm } from 'react-hook-form'

import { activityPostQuries, addActivityPost } from '@/servicetest/api/post'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'

import { CreatePostForm } from '@/components/feature'
import { useToast } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { CreateActivityPost, CreateActivityPostSchema } from '@/schema/post'

type CreateActivityPostFormProps = {
  boardId: number
}

export const CreateActivityPostForm = ({
  boardId,
}: CreateActivityPostFormProps) => {
  const { toast } = useToast()
  const router = useRouter()
  const pathName = usePathname()

  const { mutate: addPost, isPending } = useMutation({
    mutationFn: addActivityPost,
    onSuccess: (data) => onSuccess(data.message),
  })

  const form = useForm<CreateActivityPost>({
    resolver: zodResolver(CreateActivityPostSchema),
    defaultValues: {
      boardId,
      postTitle: '',
      postContent: '',
      activityDate: {
        start: undefined,
        end: undefined,
      },
      postType: 'ACTIVITY',
    },
  })

  const onSuccess = (message?: string) => {
    toast({
      title: message,
      duration: 2000,
    })

    queryClient.invalidateQueries({
      queryKey: activityPostQuries.board(boardId),
    })

    const basePath = pathName.split('/').slice(0, -1).join('/')
    router.push(basePath)
  }

  return (
    <CreatePostForm
      form={form}
      onSubmit={(values) => addPost(values)}
      isExecuting={isPending}
      isImageRequired={false}
    />
  )
}
