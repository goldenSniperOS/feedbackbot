import { getResponsesByChatId, saveResponse } from "@/lib/responses";
import { ChatResponse } from "@/types/message";
import { NextResponse } from "next/server";

export async function GET( request: Request ) {
  const { searchParams } = new URL(request.url)
  const id =  searchParams.get('id');
  const responses = await getResponsesByChatId(id)
  return NextResponse.json(responses);
}

export async function POST( request: Request ) {
  const res: ChatResponse = await request.json();
  const chat = await saveResponse(res);
    return NextResponse.json(chat);
}