import { PostResponseType, PostType } from '@/app/page'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'

interface AddPostFormTypes {
  closeModal: () => void
  addPost: (post: PostResponseType) => void
}

export function AddPostForm({ addPost, closeModal }: AddPostFormTypes) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostType>()

  const onSubmit: SubmitHandler<PostType> = async (data: PostType) => {
    const response = await axios.post('http://localhost:8080/posts/new', {
      name: data.name,
      email: data.email,
      content: data.content,
    })

    const newPost: PostResponseType = response.data

    addPost(newPost)

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
        Create post
      </button>
    </form>
  )
}
