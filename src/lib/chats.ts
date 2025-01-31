import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import { fakerDE as faker } from '@faker-js/faker';
import { Chat } from "@/types/chat";

export const getOneOrAllChats = async (id: string | null = null): Promise<(Chat | Chat[])> => {
    try {
        let agg: any[] = [
            {
              '$lookup': {
                'from': 'responses', 
                'localField': '_id', 
                'foreignField': 'chatId', 
                'as': 'answered_questions'
              }
            }
        ];
        agg = id ? [ ...agg, { '$match': { '_id': new ObjectId(id) } } ] : agg;
        const client = await clientPromise;
        const db = client.db("feedbackbot");
        const chats = await db
            .collection("chats")
            .aggregate(agg)
            .toArray();
        return id ? chats[0] as Chat : chats as Chat[] ;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const createChat = async () => {
    const email = faker.internet.email(); // Kassandra.Haley@erich.biz
    try {
        const client = await clientPromise;
        const db = client.db("feedbackbot");
        const chat = await db
            .collection("chats")
            .insertOne({ email });
        return chat;
    } catch (e) {
        console.error(e);
        return {};
    }
}