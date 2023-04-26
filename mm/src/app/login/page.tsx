"use client"

import { IUser } from '@/types/users'
import { Button, Input, PasswordInput } from '@mantine/core'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Login() {

    const router = useRouter()
    const [user, setUser] = useState<IUser>({ number: "", password: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (!(user.number || user.password)) return

        try {
            const { data } = await axios.post<IUser>("/api/login", user)
            if (data._id) return router.replace("/")
            router.refresh()
        } catch (error: any) {
            console.log(error)
            return new Error(error)
        }
    }

    return (
        <div className='flex gap-3 flex-col'>
            <h1 className='text-xl font-bold'>Login Page</h1>
            <Input
                placeholder="Enter Your Number"
                type='string'
                onChange={handleChange}
                value={user.number}
                name='number'
            />
            <PasswordInput
                placeholder="Enter Your Password"
                onChange={handleChange}
                value={user.password}
                name='password'
            />
            <Button className='bg-blue-600 hover:bg-blue-600' onClick={handleSubmit}>
                Login Now
            </Button>
        </div>
    )
}
