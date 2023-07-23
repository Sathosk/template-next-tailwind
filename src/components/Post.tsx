'use client'
import { PencilSimple, Trash } from "phosphor-react";

interface PostProps {
    name: string,
    email: string,
    content: string
}

export function Post({ name, email, content }: PostProps) {
    return (
        <div className="flex flex-col bg-slate-100 rounded-lg shadow-lg px-6 py-4">
            <header className="flex justify-between">
                <div className="flex flex-col">
                    <span className="text-3xl font-semibold">{name[0].toUpperCase().concat(name.substring(1))}</span>
                    <span className="text-md text-cyan-600 hover:underline">{email}</span>
                </div>
                <div className="flex justify-between gap-4">
                    <button>
                        <Trash size={20} />
                    </button>
                    <button>
                        <PencilSimple size={20} />
                    </button>
                </div>
            </header>

            <div className="pt-6">
                {content}
            </div>

            <div className="pt-8">05/07/2015</div>
        </div>
    )
}