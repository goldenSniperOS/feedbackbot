import { ObjectId } from "mongodb"

export enum Origin {
    Feedbackbot,
    Amazon,
    Ebay
}

export enum MessageClassificationType {
    positive,
    negative
}

export interface MessageClassification {
    phrase: string,
    intent: string,
    score: number,
    type: MessageClassificationType,
    date: Date
}

export interface Message {
    _id?: ObjectId,
    message: string,
    order: number
}

export interface ChatQuestion extends Message {
    disabled: boolean,
    suggestions?: Array<Suggestion>,
    lower?: number,
    higher?: number
}

export interface ChatResponse extends Message {
    chatId: string,
    questionId?: string,
    value: string,
    origin: Origin,
    date: Date
}

export function instanceOfChatResponse(object: any): object is ChatResponse {
    return 'chatId' in object;
}

export function instanceOfChatQuestion(object: any): object is ChatQuestion {
    return 'order' in object;
}

export interface Suggestion {
    label: string,
    inputValue: string,
    value?: number,
    hint?: string
}