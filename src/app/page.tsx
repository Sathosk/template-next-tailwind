'use client'

import { AddNewPostButton } from '@/components/AddNewPostButton'
import { FormModal } from '@/components/FormModal'
import { Post } from '@/components/Post'
import { useState } from 'react'

export interface PostType {
  name: string
  email: string
  content: string
}

export default function Home() {
  const [posts, setIsPost] = useState<PostType[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  console.log(posts)

  function changeModalState() {
    setIsModalOpen(!isModalOpen)
  }

  function addPost(newPost: PostType) {
    setIsPost(state => [...state, newPost])
  }

  return (
    <section className="mt-10 flex w-full justify-center">
      {isModalOpen && <FormModal changeModalState={changeModalState} addPost={addPost} />}

      <section className="w-1/2 flex flex-col gap-8">
        {posts.map((post, index) => (
          <Post key={index} name={post.name} email={post.email} content={post.content} />
        ))}
        <AddNewPostButton changeModalState={changeModalState} />
      </section>
    </section>
  )
}
