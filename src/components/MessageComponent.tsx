import { ChatQuestion, ChatResponse, instanceOfChatResponse } from "@/types/message";
import Image from "next/image";

export default function MessageComponent({ messageData, index }: { messageData: ChatQuestion | ChatResponse, index: number }) {
    const { message } = messageData;
    const isResponse = instanceOfChatResponse(messageData);

    return (
        <div className="flex items-start space-x-3 p-2" key={`message-${index}`}>
            {!isResponse && (
                <Image 
                    className="w-12 h-12 rounded-full bg-blue-500 p-2"
                    src={require("../../public/BotLogo.png")}
                    alt="BotLogo"
                />
            )}
            <div 
                className={`max-w-[80%] p-6 text-lg rounded-3xl my-2 ${
                    isResponse
                        ? 'bg-gray-200 ml-auto rounded-tr-none pr-8'
                        : 'bg-blue-500 text-white rounded-bl-none pl-8'
                }`}
            >
                {message}
            </div>
        </div>
    );
}