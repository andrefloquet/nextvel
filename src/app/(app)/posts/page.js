'use client'

import useSWR from 'swr'
import axios from '@/lib/axios'

import Header from '@/app/(app)/Header'

const PostsIndexPage = () => {

    const { data: posts } = useSWR('/api/posts', () =>
        axios
            .get('/api/posts')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/')
            }),
    )


    return (
        <>
            <Header title="Posts" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {JSON.stringify(posts)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostsIndexPage