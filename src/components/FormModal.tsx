'use client'
import { EditPostType, PostResponseType } from '@/app/page'
import { X } from 'phosphor-react'
import { AddPostForm } from './AddPostForm'
import { EditPostForm } from './EditPostForm'
import { EditPost } from './Post'

interface ButtonProps {
  isEdit: EditPostType
  changeModalState: () => void
  addPost: (post: PostResponseType) => void
  editPost: (id: number, editedPost: EditPost) => void
}

export function FormModal({
  isEdit,
  changeModalState,
  addPost,
  editPost,
}: ButtonProps) {
  function handleCloseModal() {
    changeModalState()
  }

  return (
    <section>
      <div className="fixed left-0 top-0 z-50 h-full w-full bg-gray-800 opacity-50"></div>

      <div className="fixed left-1/2 top-1/2 z-50 w-[400px] -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-4 shadow-md">
        <button className="fixed right-4 top-4" onClick={handleCloseModal}>
          <X />
        </button>

        {isEdit.isEdit ? (
          <EditPostForm
            isEdit={isEdit}
            closeModal={changeModalState}
            editPost={editPost}
          />
        ) : (
          <AddPostForm addPost={addPost} closeModal={changeModalState} />
        )}
      </div>
    </section>
  )
}
