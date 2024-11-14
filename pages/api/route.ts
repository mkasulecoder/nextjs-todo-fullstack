// import { getAuth } from "@clerk/nextjs/server";
// import clientPromise from "../../../lib/mongodb";
//
// export default async function handler(req: Request, res: Response) {
//     const { userId } = getAuth(req : Request);
//     if (!userId) {
//         return res.status(401).json({ error: "Unauthorized" });
//     }
//
//     const client = await clientPromise;
//     const db = client.db("todoapp");
//
//     switch (req.method) {
//         case 'GET':
//             const (todos) = await db.collection("(todos)").find({ userId }).toArray();
//             res.status(200).json((todos));
//             break;
//         case 'POST':
//             const newTodo = { text: req.body.text, completed: false, userId };
//             const result = await db.collection("(todos)").insertOne(newTodo);
//             res.status(201).json(result);
//             break;
//         default:
//             res.setHeader('Allow', ['GET', 'POST']);
//             res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
