import { NextResponse } from 'next/server';
import { createChat, getOneOrAllChats } from '@/lib/chats';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id =  searchParams.get('id');
    const chats = await getOneOrAllChats(id)
    return NextResponse.json(chats);
}

export async function POST() {
    const chat = await createChat()
    return NextResponse.json(chat);
}