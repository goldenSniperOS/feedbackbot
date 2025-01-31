import { Suggestion } from "@/types/message"

export default function SuggestionComponent ({ suggestion, index, _setSuggestion } : 
    { suggestion: Suggestion, index: Number, _setSuggestion: (inputValue, value) => void }) {
    const { label, inputValue, value, hint } = suggestion
    return (
        <div className="content-bottom h-full w-full" key={`suggestion-${index}`}>
        <div className="relative even">
          <div className="justify-between absolute bottom-16 w-full">
          <p className="hint-text text-center">{hint}</p>
          </div>
          <input id={`suggestion-${index}`} type="radio" className="radio" value={value} onChange={() =>{ _setSuggestion(inputValue, value) }} name="suggestion"/>
          <label className="radiobtn flex justify-center" htmlFor={`suggestion-${index}`}>{label}</label>
        </div>
        </div>
        // <div className="grow">
        //     <input 
        //         id={`suggestion-${index}`} 
        //         type="radio" 
        //         className="radio" 
        //         value={value?.toString()} 
        //         onChange={() =>{ _setSuggestion(inputValue, value) }} 
        //         name="suggestion"
        //     />
        //     <label className="radiobtn flex justify-center" htmlFor={`suggestion-${index}`}>
        //         {label}
        //     </label>
        // </div>
    )
}