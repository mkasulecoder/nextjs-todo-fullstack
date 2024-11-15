import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from "@clerk/nextjs/server";
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import {revalidatePath} from "next/cache";

// Dealing with single items
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { userId } = getAuth(req);
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.query;
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: "Invalid ID" });
    }

    const client = await clientPromise;
    const db = client.db("supatodo");
    const collection = db.collection("todos");

    switch (req.method) {
        case 'PUT':
            try {
                const { title, description, status } = req.body;

                // Validate input
                if (typeof title !== 'string' || typeof description !== 'string' || typeof status !== 'boolean') {
                    return res.status(400).json({ message: "Invalid input data" });
                }

                const updateResult = await collection.updateOne(
                    { _id: new ObjectId(id), userId },
                    {
                        $set: {
                            title,
                            description,
                            status,
                            updatedAt: new Date() // Add a timestamp for the update
                        }
                    }
                );

                if (updateResult.matchedCount === 0) {
                    return res.status(404).json({ message: "Todo not found" });
                }else{
                    return res.status(200).json({ message: "Todo updated successfully" });
                }

                res.status(200).json({ message: "Todo updated successfully" });
            } catch (error) {
                console.error("Error updating todo:", error);
                res.status(500).json({ message: "Internal server error" });
            }
            break;

        case 'DELETE':
            try {
                const deleteResult = await collection.deleteOne({
                    _id: new ObjectId(id),
                    userId
                });

                if (deleteResult.deletedCount === 0) {
                    return res.status(404).json({ message: "Todo not found" });
                }

                res.status(200).json({ message: "Todo deleted successfully" });
            } catch (error) {
                console.error("Error deleting todo:", error);
                res.status(500).json({ message: "Internal server error" });
            }
            break;

            // fetch single item
        case 'GET':
            try{
                const todoItem = await collection.findOne({_id : new ObjectId(id), userId});

                if(!todoItem){
                    return res.status(404).json({ message: "Item not found" });
                }else{
                    return res.status(200).json({message: "Todo fetched successfully", data:todoItem});
                }
            }catch(error){
                console.error("Error fetching todo:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}
