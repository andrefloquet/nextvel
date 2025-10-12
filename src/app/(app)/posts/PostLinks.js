'use client'

import Link from 'next/link'
import Button from '@/components/Button'
import { useAuth } from '@/hooks/auth'
import AddSvg from '@/components/AddSvg'

const PostLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <div className="px-6 py-4">
            {user ? (
                <Link
                    href="/posts/create"
                    className="ml-4 text-sm text-gray-700 underline"
                >
                    <div className="flex items-center mt-2">
                        <Button className="ml-4"> 
                            <AddSvg /> <span className='ml-2'>Create New Post</span>
                        </Button>
                    </div>
                </Link>
            ) : (
                <>
                    <Link
                        href="#"
                        className="text-sm text-gray-700 underline"
                    >
                        Create New Post
                    </Link>
                </>
            )}
        </div>
    )
}

export default PostLinks