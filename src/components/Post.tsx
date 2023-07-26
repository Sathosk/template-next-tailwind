'use client'
import { EditPostType } from '@/app/page'
import axios from 'axios'
import { PencilSimple, Trash } from 'phosphor-react'

export interface EditPost {
  id: number | undefined
  name: string
  email: string
  content: string
}

interface PostProps {
  name: string
  email: string
  content: string
  id: number | undefined
  createdAt: string
  uploadedAt: string
  isEdit: EditPostType
  deletePost: (id: number) => void
  openModal: (isEdit: boolean, post: EditPost) => void
}

export function Post({
  name,
  email,
  content,
  id,
  createdAt,
  uploadedAt,
  deletePost,
  openModal,
}: PostProps) {
  const post = {
    name,
    email,
    content,
    id,
  }

  function editModal(post: EditPost) {
    openModal(true, post)
  }

  async function handleDeletePost() {
    try {
      const response = await axios.delete(
        `http://localhost:8080/posts/delete/${id}`,
      )

      if (id) deletePost(id)

      if (response.status === 200) {
        console.log('Post deleted')
      } else {
        console.log('Failed to delete post')
      }
    } catch (error) {
      console.error('ERror deleting post:', error)
    }
  }

  return (
    <div className="flex flex-col rounded-lg bg-slate-100 px-6 py-4 shadow-lg">
      <header className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-3xl font-semibold">
            {name[0].toUpperCase().concat(name.substring(1))}
          </span>
          <span className="text-md cursor-pointer text-cyan-600 hover:underline">
            {email}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <button onClick={() => handleDeletePost()}>
            <Trash size={20} />
          </button>
          <button onClick={() => editModal(post)}>
            <PencilSimple size={20} />
          </button>
        </div>
      </header>

      <div className="pt-6">{content}</div>

      <div className="pt-8">{createdAt}</div>
    </div>
  )
}
