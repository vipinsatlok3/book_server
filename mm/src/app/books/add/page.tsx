"use client"

import React, { useState } from 'react'
import { Input, PasswordInput, Button } from '@mantine/core';
import { IUser } from '@/types/users';
import { IBook } from '@/types/books';
import { DateInput } from '@mantine/dates';

export default function BookAdd() {

    const [user, setUser] = useState<IBook>({ place: "", gyanGanga: "", jeeneKiRah: "", date: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log(user)
    }


    return (
        <div className='flex gap-3 flex-col'>
            <h1 className='text-xl font-bold'>Book Seva Details</h1>
            <Input
                placeholder="Enter Seva Place"
                type='text'
                onChange={handleChange}
                value={user.place}
                name='place'
            />
            <Input
                placeholder="Enter Gyan Ganga Count"
                type='number'
                onChange={handleChange}
                value={user.gyanGanga}
                name='gyanGanga'
            />
            <Input
                placeholder="Enter Jeene Ki Rah Count"
                onChange={handleChange}
                type='number'
                value={user.jeeneKiRah}
                name='jeeneKiRah'
            />
            <DateInput
                className='w-full'
                placeholder="Select Seva Date"
                onChange={date => setUser(prev => ({ ...prev, date: String(date) }))}
                maw={400}
                mx="auto"
                name='date'
                value={new Date(user.date || new Date())}
            />
            <Button className='bg-blue-600 hover:bg-blue-600' onClick={handleSubmit}>
                Login Now
            </Button>
        </div>
    )
}


