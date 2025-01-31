import { ChatQuestion } from "@/types/message";
import clientPromise from "./mongodb";

export const getAllQuestions = async () : Promise<ChatQuestion[]> => {
    try {
        const client = await clientPromise;
        const db = client.db("feedbackbot");
        const questions = await db
            .collection("questions")
            .find({})
            .sort({ order: 1 })
            .limit(10)
            .toArray();
        return questions as ChatQuestion[];
    } catch (e) {
        console.error(e);
        return [];
    }
}