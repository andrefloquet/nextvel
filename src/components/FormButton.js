'use client'

import { useFormStatus } from 'react-dom'

import Button from '@/components/Button'

export default function FormButton() {

    const { pending } = useFormStatus();

    return (
        <Button className="ml-4" disabled={pending}>
            { pending ? "Submitting..." :  "Create" }
        </Button>
    )
}