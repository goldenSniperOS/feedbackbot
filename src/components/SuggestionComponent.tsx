"use client";
import { Suggestion } from "@/types/message";

export default function SuggestionComponent({ suggestion, index, _setSuggestion }: 
    { suggestion: Suggestion, index: number, _setSuggestion: (inputValue: string, value?: number) => void }) {
    const { label, inputValue, value, hint } = suggestion;
    
    return (
        <div className="h-full w-full" key={`suggestion-${index}`}>
            <div className="relative flex flex-col items-center">
                {hint && <p className="text-gray-500 text-sm text-center absolute bottom-16 w-full">{hint}</p>}
                <input 
                    id={`suggestion-${index}`} 
                    type="radio" 
                    className="hidden peer" 
                    value={value} 
                    onChange={() => _setSuggestion(inputValue, value)} 
                    name="suggestion"
                />
                <label 
                    className="bg-gray-200 px-6 py-3 h-12 flex items-center justify-center rounded-full cursor-pointer transition transform hover:scale-105 peer-checked:bg-blue-500 peer-checked:text-white text-center w-full max-w-xs"
                    htmlFor={`suggestion-${index}`}
                >
                    {label}
                </label>
            </div>
        </div>
    );
}
