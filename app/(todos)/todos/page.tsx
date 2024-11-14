import React from 'react';
import Todo from "@/app/components/Todo/page";
import {auth} from "@clerk/nextjs/server"; // used in server
// import {useAuth} from "@clerk/nextjs"; // used in client

const api_url = process.env.NEXT_PUBLIC_API!;

interface TodoItem {
    _id: string;
    title: string;
    description: string;
    time: string;
    status: boolean;
    userId: string;
}

const Page  = async () => {

    try{
        // Get authentication token
        const {userId, getToken} = await auth(); // Use Clerk's hook to get the token

        // get user
        if (!userId) {
            throw new Error("User not authenticated");
        }

        // Get the token
        const token = await getToken();

        if (!token) {
            throw new Error("No authentication token found");
        }
        // Fetch Data
        const response : Response  = await fetch(api_url,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the request
                }
            });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // ALT - avoids deserialization/desctruction issues in api backend with the .data()
        // const responseData = await response.json();
        // const todos = responseData.data;
        // console.log("All tasks:", todos);


        const {data: todos} = await response.json();
        // console.log("All tasks:", todos);

        return (
            <div className="bg-white w-full flex flex-col justify-center items-center py-4">
                <div className="w-1/2 flex flex-col w-full justify-center items-center space-y-2 my-4">
                    {Array.isArray(todos) && todos.length > 0 ? (
                        // sort todos in reverse order
                        [...todos].reverse().map((todo: TodoItem) => (<Todo key={todo._id} todo={todo}/>))
                    ) : (
                        <p>No tasks found</p>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching todos:', error);
        return <div>Error loading todos</div>;
    }
    ;


};

export default Page;