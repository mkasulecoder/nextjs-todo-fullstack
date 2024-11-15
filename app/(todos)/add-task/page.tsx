"use client";

import React, { useState } from 'react';
import { useAuth } from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

const api_url = process.env.NEXT_PUBLIC_API!;

const Page = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState(false);
    // Create the user
    const { userId, getToken } = useAuth();

    // Navigation
    const router : AppRouterInstance = useRouter();

    const handleTodoPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!userId) {
                throw new Error("User not authenticated");
            }

            const token = await getToken();

            if (!token) {
                throw new Error("No authentication token found");
            }

            const response: Response = await fetch(api_url,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, description, time, status: status, userId }),
                }
                );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Success:', data);

            // Clear form fields after successful submission
            setTitle('');
            setDescription('');
            setTime('');
            //setStatus(false);

            router.push('todos')

        } catch (error) {
            console.error('Error creating Todo:', error);
            // Handle error (e.g., show error message to user)
            // Clear form fields after failed submission
            setTitle('');
            setDescription('');
            setTime('');
            setStatus(false);
        }
    };

    return (
        <div className="w-full bg-white flex flex-col justify-center items-center min-h-[90dvh] text-gray-900">
            <form onSubmit={handleTodoPost} className="w-1/2 flex flex-col space-y-4 h-full">
                <label htmlFor="title">Title:</label>
                <input className="outline outline-neutral-200" type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label htmlFor="description">Description:</label>
                <textarea className="outline outline-neutral-200" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

                <label htmlFor="time">Time:</label>
                <input className="outline outline-neutral-200" type="datetime-local" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} required />

                <label htmlFor="status">Status:</label>
                <select className="py-2" id="status" name="status" value={status.toString()} onChange={(e) => setStatus(e.target.value === 'true')}>
                    <option  value="true">Completed</option>
                    <option value="false">Not Completed</option>
                </select>

                <button type="submit" className="text-white px-2 py-3 font-bold capitalize bg-blue-700">Submit</button>
            </form>
        </div>
    );
};

export default Page;
