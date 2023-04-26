"use client"

import React, { useState } from 'react'
import { Input, PasswordInput, Button } from '@mantine/core';
import { IUser } from '@/types/users';
import axios from 'axios';

export default function UserAdd() {

    const [user, setUser] = useState<IUser>({ number: "", password: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (!(user.number || user.password)) return

        try {

            const { data } = await axios.post("/api/users", user)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='flex gap-3 flex-col'>
            <h1 className='text-xl font-bold'>Login to Your Account</h1>
            <Input
                placeholder="Enter Your Name"
                type='text'
                onChange={handleChange}
                value={user.name}
                name='name'
            />
            <Input
                placeholder="Enter Your Number"
                type='number'
                onChange={handleChange}
                value={user.number}
                name='number'
            />
            
            <Button className='bg-blue-600 hover:bg-blue-600' onClick={handleSubmit}>
                Login Now
            </Button>
        </div>
    )
}


