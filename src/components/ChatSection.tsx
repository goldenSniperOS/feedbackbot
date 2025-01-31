"use client"

import { Chat } from "@/types/chat";
import { useEffect, useState } from "react";
import Table from "./Table";

import "./ChatSection.css";
import { TableTypes } from "@/types/table";

export default function ChatSection ({ host }: { host: string | undefined }) {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingChats, setLoadingChats] = useState(false);

    useEffect(() => {
        setLoadingChats(true);
        (async () => {
            const res = await fetch(`${host}/api/chat`);
            const chats = await res.json();
            const chatsWithLink = chats.map((chat) => {
                return { ...chat, link: `${host}/chat/${chat._id}` }
            });
            setLoadingChats(false);
            setChats(chatsWithLink)
        })()
    },[]);

    const createChat = async () => {
        setLoading(true);
        const res = await fetch(`${host}/api/chat`, {
            method: "POST"
        });
        const { insertedId } = await res.json();
        const chatRes = await fetch(`${host}/api/chat?id=${insertedId}`);
        const insertedChat = await chatRes.json();
        setChats([ ...chats, { ...insertedChat, link: `${host}/chat/${insertedChat._id}` } ]);
        setLoading(false);
    }

    const headers = [
        { label:"Id", type: TableTypes.String, path:"_id" },
        { label:"Email", type: TableTypes.String, path:"email" },
        { label:"Link", type: TableTypes.Link, path:"link" },
        { label:"Answered Questions", type: TableTypes.Number, path:"answered_questions" }
    ]

    return (
        <div>
            <div className="flex items-center mb-8">
                <button className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300 mr-5"
                    onClick={() => createChat()}
                >
                    Create Chat +
                </button>
                { loading && <div className="loader"></div> }
            </div>
            { loadingChats 
                ? <div className="w-full flex justify-center"><div className="loader"></div></div>
                : <Table data={chats} headers={headers} label={"chats"} />
            }
        </div>
    )
}