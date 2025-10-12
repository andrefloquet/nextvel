'use client'

import useSWR from 'swr'
import axios from '@/lib/axios'

import Header from '@/app/(app)/Header'
import PostCard from '@/components/PostCard'
import PageContainer from '@/components/PageContainer'
import PageListingContainer from '@/components/PageListingContainer'
import PostLinks from '@/app/(app)/posts/PostLinks'

const PostsIndexPage = () => {

    const { data: posts } = useSWR('/api/posts', () =>
        axios
            .get('/api/posts')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                // router.push('/')
            }),
    )

    return (
        <>
            <Header title="Posts" />
            <PageContainer>
                <PostLinks />
                <PageListingContainer>
                    <PostCard posts={posts} />
                </PageListingContainer>
            </PageContainer>
        </>
    )
}

export default PostsIndexPage