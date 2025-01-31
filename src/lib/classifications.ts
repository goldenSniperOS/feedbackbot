import { fromDBResultsToClassifications } from "@/utils/mappers";
import clientPromise from "./mongodb";
import { MessageClassification } from "@/types/message";

export const getAllClassifications = async (): Promise<MessageClassification[]> => {
  try {
      const client = await clientPromise;
      const db = client.db("feedbackbot");
      const classifications = await db
          .collection("classifications")
          .find()
          .toArray();
      return fromDBResultsToClassifications(classifications);
    } catch (e) {
      console.error(e);
      return [];
    }
}