import { EditPostType, PostType } from '@/app/page'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { useEffect } from 'react'
import { EditPost } from './Post'

interface AddPostFormTypes {
  closeModal: () => void
  isEdit: EditPostType
  editPost: (id: number, editedPost: EditPost) => void
}

export function EditPostForm({
  isEdit,
  closeModal,
  editPost,
}: AddPostFormTypes) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostType>()

  useEffect(() => {
    // Check if editPost is defined and has the post property
    if (isEdit && isEdit.post) {
      // Use the setValue function to set the default values for the form fields
      setValue('name', isEdit.post.name)
      setValue('email', isEdit.post.email)
      setValue('content', isEdit.post.content)
    }
  }, [isEdit, setValue]) // Add editPost and setValue as dependencies

  const onSubmit: SubmitHandler<PostType> = async (data: PostType) => {
    const editedPost = {
      id: isEdit?.post?.id,
      name: data.name,
      email: data.email,
      content: data.content,
    }

    const response = await axios.put(
      'http://localhost:8080/posts/edit',
      editedPost,
    )

    if (response.status === 200) {
      if (editedPost.id) editPost(editedPost.id, editedPost)
      console.log('Post Edited Successfully')
    } else {
      console.log('Something went wrong')
    }

    closeModal()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex w-full flex-col">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="border-2"
        />
        {errors.name && (
          <span className="text-red-600">{errors.name.message}</span>
        )}
      </div>

      <div className="flex w-full flex-col">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          {...register('email', { required: 'Email is required' })}
          className="border-2"
        />
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
      </div>

      <div className="flex w-full flex-grow flex-col">
        <label htmlFor="content">Message:</label>
        <textarea
          id="content"
          {...register('content', {
            required: 'Content is required',
          })}
          className="border-2"
        />
        {errors.content && (
          <span className="text-red-600">{errors.content.message}</span>
        )}
      </div>

      <button type="submit" className="bg-gray-300">
        Edit post
      </button>
    </form>
  )
}
