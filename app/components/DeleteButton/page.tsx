"use client"

import React from 'react';
import {useAuth} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

const api_url = process.env.NEXT_PUBLIC_API!;

const DeleteButton = ({id} : {id : string}) => {
    // Create the user
    const { userId, getToken } = useAuth();

    // Refresh page
    const router : AppRouterInstance = useRouter();

    const handleDelete = async () => {

        try{
            if (!userId) {
                throw new Error("User not authenticated");
            }

            const token = await getToken();

            if (!token) {
                throw new Error("No authentication token found");
            }
            console.log(`${api_url}/${id}`)
            const response : Response = await fetch(`${api_url}/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
            }
            // const data = await response.json();
            console.log('Success:', response.status);
            router.refresh();
        }catch(err){
            console.error("Error deleting todo:", err);
            return;
        }
    }
    return (
        <div className="w-1/3">
            <button
                onClick={handleDelete}
                type="button" className="text-white w-full font-semibold bg-red-700 rounded hover:bg-blue-800">Delete
            </button>
        </div>
    );
};

export default DeleteButton;