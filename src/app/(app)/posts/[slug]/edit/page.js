'use client'

import { useState } from 'react'

import useSWR from 'swr'
import axios from '@/lib/axios'

import { useAuth } from '@/hooks/auth'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import TextArea from '@/components/TextArea'
import Header from '@/app/(app)/Header'
import PageContainer from '@/components/PageContainer'
import Message from '@/components/Message'

export default function PostEdit({ params }) {

    const [title, setTitle] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([])
    const [isVisible, setIsVisible] = useState(null)
    const [messageType, setMessageType] = useState('')
    const [messageText, setMessageText] = useState('')
    const [buttonText, setButtonText] = useState('Update')

    useSWR('/api/posts/' + params.slug, () =>
        axios
            .get('/api/posts/' + params.slug)
            .then(res => {

                setTitle(res.data.title)
                setExcerpt(res.data.excerpt)
                setBody(res.data.body)

                return  res.data
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })
    )

    const { user, csrf, mutate } = useAuth()

    const update = async ({ setErrors, ...props }) => {

        setButtonText('Submitting...')

        await csrf()

        setErrors([])

        axios
            .put('/api/posts/' + params.slug , props)
            .then(() => {
                mutate()
                setIsVisible(true)
                setMessageType('success')
                setMessageText('Your Post was updated successfully!')
                setButtonText('Update')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
                setIsVisible(true)
                setMessageType('fail')
                setMessageText("An error occured, please try again!")
                setButtonText('Update')
            })
    }

    const submitForm = event => {
        event.preventDefault()

        update({
            "user_id": user.id,
            title,
            excerpt,
            body,
            setErrors,
        })
    }

    return (
        <>
            <Header title="Update Post" />
            <PageContainer>
                <div className={ isVisible ? "block" : "hidden" }>
                    <Message type={ messageType } text={ messageText } />
                </div>
            
                <form onSubmit={submitForm}>
                    {/* Title */}
                    <div>
                        <Label htmlFor="title">Title</Label>

                        <Input
                            id="title"
                            type="text"
                            value={title}
                            className="block mt-1 w-full"
                            onChange={event => setTitle(event.target.value)}
                            required
                            autoFocus
                        />

                        <InputError messages={errors.title} className="mt-2" />
                    </div>

                    {/* Excerpt */}
                    <div className="mt-4">
                        <Label htmlFor="excerpt">Excerpt</Label>

                        <Input
                            id="excerpt"
                            type="text"
                            value={excerpt}
                            className="block mt-1 w-full"
                            onChange={event => setExcerpt(event.target.value)}
                            required
                        />

                        <InputError messages={errors.excerpt} className="mt-2" />
                    </div>

                    {/* Body */}
                    <div className="mt-4">
                        <Label htmlFor="body">Body</Label>

                        <TextArea
                            id="body"
                            rows={15}
                            value={body}
                            className="block mt-1 w-full"
                            onChange={event => setBody(event.target.value)}
                            required
                        />

                        <InputError messages={errors.body} className="mt-2" />
                    </div>

                    <div className="mt-5" style={ { display: isVisible ? "block" : "none" } }>
                        <Message type={ messageType } text={ messageText } />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4">
                            { buttonText }
                        </Button>
                    </div>
                </form>
            </PageContainer>
        </>
    )
}