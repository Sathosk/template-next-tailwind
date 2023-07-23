'use client'
import { PostType } from '@/app/page';
import { X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'

interface ButtonProps {
    changeModalState: () => void;
    addPost: (post: PostType) => void;
}

interface postType {
    name: string
    email: string
    content: string
}

export function FormModal({ changeModalState, addPost }: ButtonProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<postType>()

    function handleCloseModal() {
        changeModalState()
    }

    const onSubmit: SubmitHandler<postType> = (data: postType) => {
        const newPost = {
            name: data.name,
            email: data.email,
            content: data.content,
        }
        console.log(newPost)

        addPost(newPost);

        changeModalState();
    }

    return (
        <section>
            <div className="fixed left-0 top-0 z-50 h-full w-full bg-gray-800 opacity-50"></div>

            <div className="fixed left-1/2 top-1/2 z-50 w-[400px] -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-4 shadow-md">
                <button className="fixed right-4 top-4" onClick={handleCloseModal}>
                    <X />
                </button>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex w-full flex-col">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: "Name is required" })}
                            className="border-2"
                        />
                        {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                    </div>

                    <div className="flex w-full flex-col">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            {...register('email', { required: "Email is required" })}
                            className="border-2"
                        />
                        {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                    </div>

                    <div className="flex w-full flex-grow flex-col">
                        <label htmlFor="content">Message:</label>
                        <textarea
                            id="content"
                            {...register('content', { required: "Content is required" })}
                            className="border-2"
                        />
                        {errors.content && <span className='text-red-600'>{errors.content.message}</span>}
                    </div>

                    <button type="submit" className="bg-gray-300">
                        Create post
                    </button>
                </form>
            </div>
        </section>
    )
}
