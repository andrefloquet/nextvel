'use client'

import useSWR from 'swr'
import axios from '@/lib/axios'
import PageContainer from '@/components/PageContainer'
import Image from 'next/image'

export default function PostShowPage({ params }) {
    
    const { data: post } = useSWR('/api/posts/' + params.slug, () =>
        axios
            .get('/api/posts/' + params.slug)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )
  
    const postDate =
      new Date(post?.created_at).getDate() +
      "/" +
      parseInt(new Date(post?.created_at).getMonth() + 1) +
      "/" +
      new Date(post?.created_at).getFullYear()
  
    return (
        <>
            <PageContainer>
                <div className='relative w-full h-64'>
                    <Image
                        src="https://images.pexels.com/photos/163097/twitter-social-media-communication-internet-network-163097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Post Image"
                        className="object-cover object-center rounded-md mb-6"
                        fill
                    />
                </div>
                <h1 className="text-3xl font-semibold my-6">{post?.title}</h1>
                <p className="text-gray-400 mb-6">
                    Published on {postDate} by {post?.user.name}
                </p>
                <div
                    className="prose"
                    dangerouslySetInnerHTML={{
                    __html: post?.body
                    }}
                ></div>
            </PageContainer>
        </>
    );
  }