"use client";
import { useEffect, useRef, useState } from "react";
import Input from "./Input";

import { getQuestionBasedOnValueAndOrder } from "../utils/question";
import {
  ChatQuestion,
  ChatResponse,
  Origin,
  Suggestion,
} from "@/types/message";
import MessageComponent from "./MessageComponent";
import SuggestionComponent from "./SuggestionComponent";
import Image from "next/image";

const Chat = ({
  questions,
  responses,
  host,
  id,
}: {
  questions: ChatQuestion[];
  responses: ChatResponse[];
  host: string | undefined;
  id: string;
}) => {
  const lastQuestionOrderIndex = questions[questions.length - 1].order;
  const [messages, setMessages] = useState<(ChatQuestion | ChatResponse)[]>([]);
  const [questionOrderIndex, setQuestionOrderIndex] = useState(1);
  const [responseValue, setResponseValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [actualQuestion, setActualQuestion] = useState<ChatQuestion>();
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
    return totalMessages.map((m, i) => (
      <MessageComponent messageData={m} index={i} key={i} />
    ));
  };

  const inputFocus = () => {
    inputReference?.current?.focus();
  };

  const _setSuggestion = (inputValue, value) => {
    setInputValue(inputValue);
    if (!inputDisabled) inputFocus();

    if (value) setResponseValue(value);
  };

  const renderSuggestions = () => {
    return suggestions.map((s, i) => (
      <SuggestionComponent
        suggestion={s}
        key={i}
        index={i}
        _setSuggestion={_setSuggestion}
      />
    ));
  };

  const scrollToBottom = () => {
    endChatReference.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showQuestion = async () => {
    const timeout1 = setTimeout(() => {
      addQuestion(messages, {
        message: "...",
        disabled: true,
        suggestions: [],
      });
    }, 500);

    const timeout2 = setTimeout(() => {
      const question = getQuestionBasedOnValueAndOrder(
        questions,
        questionOrderIndex,
        responseValue
      );
      const cleanMessages = messages.filter((m) => m.message !== "...");

      addQuestion(cleanMessages, question);
    }, 1500);
  };

  useEffect(() => {
    showQuestion();
    setResponseValue("");
    setInputValue("");
  }, [questionOrderIndex]);

  const addQuestion = (messages, question) => {
    const { suggestions } = question;
    setSuggestions(suggestions);
    setActualQuestion(question);
    setMessages([...messages, question]);
  };

  useEffect(() => {
    scrollToBottom();
    setTimeout(() => {
      if (actualQuestion) {
        const { disabled } = actualQuestion;
        setInputDisabled(disabled);
      }
    }, 500);
  }, [messages, suggestions, actualQuestion]);

  useEffect(() => {
    if (!inputDisabled) {
      inputFocus();
    }
  }, [inputDisabled]);

  const sendMessage = () => {
    if (
      questionOrderIndex !== lastQuestionOrderIndex &&
      id &&
      actualQuestion?._id
    ) {
      const response: ChatResponse = {
        chatId: id,
        message: inputValue,
        questionId: actualQuestion?._id?.toString(),
        order: actualQuestion?.order,
        value: responseValue,
        origin: Origin.Feedbackbot,
        date: new Date(),
      };
      setMessages([...messages, response]);
      insertResponse(response);
      setQuestionOrderIndex(questionOrderIndex + 1);
    }
  };

  const insertResponse = async (response: ChatResponse) => {
    await fetch(`${host}/api/message/response`, {
      body: JSON.stringify(response),
      method: "POST",
    });
  };

  const inputOnChange = (event) => {
    if (!inputDisabled) {
      setResponseValue(event.target.value);
    }
    setInputValue(event.target.value);
  };

  useEffect(() => {
    let initialMessages: (ChatQuestion | ChatResponse)[] = [];
    responses.forEach((r) => {
      const question = questions.find(
        (q) => q._id?.toString() === r.questionId
      );
      if (question) {
        initialMessages = [...initialMessages, question, r];
      }
    });
    setMessages(initialMessages);
    setQuestionOrderIndex(questions.length === responses.length ? responses.length : responses.length + 1);
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
            <SuggestionComponent
              suggestion={s}
              key={i}
              index={i}
              _setSuggestion={setInputValue}
            />
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
            <button
              onClick={sendMessage}
              className="flex items-center justify-center bg-teal-400 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-teal-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-300 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 mr-2"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
