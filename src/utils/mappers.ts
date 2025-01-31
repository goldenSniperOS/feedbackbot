import { ChatResponse, MessageClassification } from "@/types/message"

export const fromDBResultsToClassifications = (dbResponses: any[]) : MessageClassification[] => {
    return dbResponses.map(r => {
        const c: MessageClassification = {
            phrase: r['phrase'],
            date: r['date'],
            intent: r['intent'],
            score: r['score'],
            type: r['type']
        }
        return c
    });
}

export const fromDBResultsToResponses = (dbResponses: any[]) : ChatResponse[] => {
    return dbResponses.map(r => {
        const cR: ChatResponse = {
            chatId: r['chatId'],
            date: r['date'],
            message: r['message'],
            order: r['order'],
            origin: r['origin'],
            value: r['value'],
            _id: r['_id'],
            questionId: r['questionId']
        }
        return cR;
    });
}