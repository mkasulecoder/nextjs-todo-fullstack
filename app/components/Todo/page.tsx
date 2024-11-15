import React from 'react';
import DeleteButton from "@/app/components/DeleteButton/page";
import EditButton from "@/app/components/EditButton/page";
import {ClerkProvider} from "@clerk/nextjs";

interface TodoItem {
    _id: string;
    title: string;
    description: string;
    time: string;
    status: boolean;
}

const Todo = ({todo} : {todo : TodoItem}) => {

    return (
        <>
            <div className="w-full flex flex-col border border-1 border-gray-200 drop-shadow-lg text-gray-900 p-2 rounded">
                <h1 className="font-extrabold">{todo.title}</h1>
                <p>{todo.description}</p>
                <p>Time: {todo.time}</p>
                {todo.status? (
                    <span className="text-green-600">Status: Completed</span>
                ):(
                    <span className="text-red-600">Status: Not Completed</span>
                )}

                <div className="flex flex-row w-full space-x-3">
                    {todo.status? (
                        <button className="text-white w-1/3 font-semibold bg-gray-700 rounded hover:bg-green-800">Mark as Not Completed</button>
                        ): (
                        <button className="text-white w-1/3 font-semibold bg-green-700 rounded hover:bg-green-800">Mark as Completed</button>
                    )}
                    <EditButton item_id={todo._id}/>
                    <ClerkProvider dynamic>
                        <DeleteButton id={todo._id}/>
                    </ClerkProvider>

                </div>

            </div>
        </>
    );
};

export default Todo;