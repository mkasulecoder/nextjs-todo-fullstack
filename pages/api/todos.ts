import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from "@clerk/nextjs/server";
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Define the structure of a Todo item
interface Todo {
    _id?: ObjectId;
    title: string;
    description: string;
    time: Date;  // Change from number to Date
    status: boolean;
    userId: string;
}

// Define possible response data types
type ResponseData = {
    message: string;
    data?: Todo | Todo[] | any;
    error?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    // Authenticate the user
    const { userId } = getAuth(req);
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized", error: "User not authenticated" });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("supatodo");
    const collection = db.collection<Todo>("(todos)");

    try {
        switch (req.method) {
            case 'GET':
                // Check if an ID is provided in the query parameters
                if (req.query.id) {
                    // Fetch a single todo
                    const todoId = new ObjectId(req.query.id as string);
                    const todo = await collection.findOne({ _id: todoId, userId });

                    if (!todo) {
                        res.status(404).json({ message: "Todo not found", error: "No matching todo found" });
                    } else {
                        res.status(200).json({ message: "Todo fetched successfully", data: todo });
                    }
                } else {
                    // Fetch all (todos) for the user
                    const todos = await collection.find({userId}).toArray();
                    //console.log("Hello, ", getAuth(req).getToken());
                    // console.log("Hello, ", userId)

                    // If you want to simplify this further, you could modify your API to return just the todos array:
                    // const todos = await collection.find({userId}).toArray();
                    // res.status(200).json(todos);

                    res.status(200).json({ message: "Todos fetched successfully", data: todos });
                }
                break;

            case 'POST':
                // CREATE: Add a new todo
                const newTodo: Todo = {
                    title: req.body.title,
                    description: req.body.description,
                    time: new Date(),  // Use Date object instead of Date.now()
                    status: false,
                    userId
                };
                const insertResult = await collection.insertOne(newTodo);
                res.status(201).json({
                    message: "Todo created successfully",
                    data: { ...newTodo, _id: insertResult.insertedId }
                });
                break;

            case 'PUT':
                // UPDATE: Modify an existing todo
                const todoId = new ObjectId(req.body._id);
                const updateData = {
                    title: req.body.title,
                    description: req.body.description,
                    time: new Date(req.body.time),  // Assuming time is sent as a string
                    status: req.body.status
                };
                const updateResult = await collection.updateOne(
                    { _id: todoId, userId },
                    { $set: updateData }
                );
                if (updateResult.matchedCount === 0) {
                    res.status(404).json({ message: "Todo not found", error: "No matching todo found for update" });
                } else {
                    res.status(200).json({ message: "Todo updated successfully", data: updateResult });
                }
                break;


            case 'DELETE':
                // DELETE: Remove a todo
                const deleteId = new ObjectId(req.query.id as string);
                const deleteResult = await collection.deleteOne({ _id: deleteId, userId });
                if (deleteResult.deletedCount === 0) {
                    res.status(404).json({ message: "Todo not found", error: "No matching todo found for deletion" });
                } else {
                    res.status(200).json({ message: "Todo deleted successfully", data: deleteResult });
                }
                break;

            default:
                // Handle unsupported HTTP methods
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).json({ message: `Method ${req.method} Not Allowed`, error: "Unsupported HTTP method" });
        }
    } catch (error) {
        // Handle any errors that occur during the operations
        console.error("Error in todo API:", error);
        res.status(500).json({ message: "Internal server error", error: "An unexpected error occurred" });
    }
}


// import type { NextApiRequest, NextApiResponse } from 'next'
// import clientPromise from '@/lib/mongodb';
//
// type ResponseData = {
//     message: string
// }
//
// export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
//     res.status(200).json({ message: 'Hello from Next.js!' })
// }