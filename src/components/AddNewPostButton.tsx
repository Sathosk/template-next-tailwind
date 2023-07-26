'use client'
import { Plus } from 'phosphor-react'

interface ButtonProps {
  changeModalState: () => void
}

export function AddNewPostButton({ changeModalState }: ButtonProps) {
  function handleOpenModal() {
    console.log('works')
    changeModalState()
  }

  return (
    <button
      className="fixed bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-full bg-slate-300"
      onClick={handleOpenModal}
    >
      <Plus size={20} />
    </button>
  )
}
