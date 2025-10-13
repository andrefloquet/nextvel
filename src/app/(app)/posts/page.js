'use client'

import { useState, useEffect } from 'react'
import axios from '@/lib/axios'

import Header from '@/app/(app)/Header'
import PostCard from '@/components/PostCard'
import PageContainer from '@/components/PageContainer'
import PageListingContainer from '@/components/PageListingContainer'
import PostLinks from '@/app/(app)/posts/PostLinks'

const PostsIndexPage = () => {

    const [posts, setPosts] = useState([[{}]])

    useEffect(() => {
        axios
            .get('/api/posts')
            .then(res => {setPosts(res.data)})
            .catch(error => {
                if (error.response.status !== 409) throw error
            })
    }, [posts])

    return (
        <>
            <Header title="Posts" />
            <PageContainer>
                <PostLinks />
                <PageListingContainer>
                {posts?.map((post) => (
                    <PostCard key={post.id} post={post} />
                 ))} 
                </PageListingContainer>
            </PageContainer>
        </>
    )
}

export default PostsIndexPage