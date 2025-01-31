"use client";
import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import { getQuestionBasedOnValueAndOrder } from "../utils/question";
import { ChatQuestion, ChatResponse, Origin, Suggestion } from "@/types/message";
import MessageComponent from "./MessageComponent";
import SuggestionComponent from "./SuggestionComponent";
import Image from "next/image";

const Chat = ({ questions, responses, host, id }) => {
  const lastQuestionOrderIndex = questions[questions.length - 1]?.order || 1;
  const [messages, setMessages] = useState<(ChatQuestion | ChatResponse)[]>([]);
  const [questionOrderIndex, setQuestionOrderIndex] = useState(1);
  const [responseValue, setResponseValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [actualQuestion, setActualQuestion] = useState<ChatQuestion | null>(null);
  const [inputDisabled, setInputDisabled] = useState(true);

  const inputReference = useRef<HTMLInputElement>(null);
  const endChatReference = useRef<HTMLDivElement>(null);

  const renderMessages = () => {
    const totalMessages = [
      {
        message: "Bienvenido a FeedbackBot!",
        order: 0,
        disabled: true,
        suggestions: [],
        lower: 0,
        higher: 5,
      },
      ...messages,
    ];
    return totalMessages.map((m, i) => <MessageComponent messageData={m} index={i} key={i} />);
  };

  useEffect(() => {
    let initialMessages: (ChatQuestion | ChatResponse)[] = [];
    responses.forEach((r) => {
      const question = questions.find((q) => q._id?.toString() === r.questionId);
      if (question) {
        initialMessages.push(question, r);
      }
    });
    setMessages(initialMessages);
    setQuestionOrderIndex(responses.length + 1);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 font-montserrat">
      <div className="flex flex-col bg-white max-h-screen w-full md:w-[800px] md:h-[1000px] md:max-h-[90%] rounded-3xl shadow-lg p-5">
        <div id="chat" className="flex-1 overflow-auto p-3 bg-white">
          {renderMessages()}
          <div ref={endChatReference} />
        </div>
        <div className="flex justify-between mt-4">
          {suggestions.map((s, i) => (
            <SuggestionComponent suggestion={s} key={i} index={i} _setSuggestion={setInputValue} />
          ))}
        </div>
        {lastQuestionOrderIndex !== questionOrderIndex && (
          <div className="flex items-center mt-4 p-2">
            <Input
              className="flex-1 bg-gray-200 text-black p-4 rounded-full focus:outline-none"
              value={inputValue}
              disabled={inputDisabled}
              ref={inputReference}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <span
              className="material-symbols-outlined cursor-pointer text-gray-500 hover:text-gray-700 text-2xl ml-3"
              onClick={() => {}}
            >
              send
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
