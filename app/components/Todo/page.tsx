import React from 'react';

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
            <div className="w-full flex flex-col border border-2 border-gray-400 drop-shadow-lg text-gray-900 p-2 rounded">
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
                    <button className="text-white w-1/3 font-semibold bg-blue-700 rounded hover:bg-red-800">Edit
                    </button>
                    <button
                        className="text-white w-1/3 font-semibold bg-red-700 rounded hover:bg-blue-800">Delete
                    </button>
                </div>

            </div>
        </>
    );
};

export default Todo;