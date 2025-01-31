import { ObjectId } from "mongodb";

export interface Chat {
    _id: ObjectId,
    email?: string
}