'use client'
import { AddNewPostButton } from '@/components/AddNewPostButton'
import { FormModal } from '@/components/FormModal'
import { EditPost, Post } from '@/components/Post'
import { useEffect, useState } from 'react'

export interface PostType {
  name: string
  email: string
  content: string
}

export interface PostResponseType {
  id: number | undefined
  name: string
  email: string
  content: string
  created_at: string
  updated_at: string
}

export interface EditPostType {
  isEdit: boolean
  post: EditPost | undefined
}

export default function Home() {
  const [posts, setPosts] = useState<PostResponseType[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isEditPost, setIsEditPost] = useState<EditPostType>({
    isEdit: false,
    post: undefined,
  })

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/posts')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchPosts()
  }, [])

  function changeModalState(isEdit?: boolean, post?: EditPost) {
    if (isEdit) setIsEditPost({ isEdit, post })
    else setIsEditPost({ isEdit: false, post: undefined })
    setIsModalOpen(!isModalOpen)
  }

  function addPost(newPost: PostResponseType) {
    setPosts((state) => [...state, newPost])
  }

  function deletePost(id: number) {
    setPosts(posts.filter((post) => post.id !== id))
  }

  function editPost(id: number, editedPost: EditPost) {
    setPosts(
      posts.map((post) => {
        return post.id === id ? { ...post, ...editedPost } : post
      }),
    )
  }

  return (
    <section className="mt-10 flex w-full justify-center">
      {isModalOpen && (
        <FormModal
          changeModalState={changeModalState}
          addPost={addPost}
          isEdit={isEditPost}
          editPost={editPost}
        />
      )}

      <section className="flex w-1/2 flex-col gap-8">
        {posts
          .map((post, index) => (
            <Post
              key={index}
              name={post.name}
              email={post.email}
              content={post.content}
              createdAt={post.created_at}
              uploadedAt={post.updated_at}
              id={post.id}
              isEdit={isEditPost}
              deletePost={deletePost}
              openModal={changeModalState}
            />
          ))
          .reverse()}
        <AddNewPostButton changeModalState={changeModalState} />
      </section>
    </section>
  )
}
