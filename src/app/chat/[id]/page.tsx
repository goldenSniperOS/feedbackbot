import { ChatQuestion, ChatResponse } from '@/types/message';
import Chat from '@/components/Chat';
import { getAllQuestions } from '@/lib/questions';
import { getResponsesByChatId } from '@/lib/responses';
 
export default async function Page({
  params,
}: { params: { id: string } }) {
  const questions: ChatQuestion[] = JSON.parse(JSON.stringify(await getAllQuestions()));
  if(params.id) {
    const responses: ChatResponse[] = JSON.parse(JSON.stringify(await getResponsesByChatId(params.id)));
    return <Chat questions={[...questions, {
      message: "Gracias por tus comentarios",
      order: questions.length + 1,
      disabled: true,
      suggestions: [],
      lower: 0,
      higher: 5
    }]} responses={responses} host={process.env.HOST_URI} id={params.id} />;
  }
  return <h1>No Chat Id Provided</h1>
}
