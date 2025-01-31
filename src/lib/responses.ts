import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import { ChatResponse } from "@/types/message";

export const getAllResponses = async (): Promise<ChatResponse[]> => {
  try {
      const client = await clientPromise;
      const db = client.db("feedbackbot");
      const messages = await db
          .collection("responses")
          .find({ order: 2 })
          .toArray();
      return messages as ChatResponse[];
    } catch (e) {
      console.error(e);
      return [];
    }
}

export const getResponsesByChatId = async (id : string | null ): Promise<ChatResponse[]> => {
    try {
        const client = await clientPromise;
        const db = client.db("feedbackbot");
        const query = id ? { chatId: new ObjectId(id) } : {};
        const messages = await db
            .collection("responses")
            .find(query)
            .sort({ order: 1 })
            .toArray();
        return messages as ChatResponse[];
      } catch (e) {
        console.error(e);
        return [];
      }
}

export const saveResponse = async ( res: ChatResponse ) => {
    try {
        const client = await clientPromise;
        const db = client.db("feedbackbot");
        await db
            .collection("responses")
            .insertOne({ 
              ...res, 
              chatId: new ObjectId(res.chatId),
              questionId: new ObjectId(res.questionId),
              date: new Date()
            });
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
}