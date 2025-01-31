import { useState } from "react";
import IntentSelector from "./IntentSelector";
import Wortwolke from "./Wortwolke";
import { MessageClassification } from "@/types/message";

export default function WortwolkeGroup ({ classifications, optionButtons }: 
    { classifications: MessageClassification[], optionButtons: Array<{ intent: string, percentage: number, original_intent: string }> }) {
    const [selected, setSelected] = useState("");
    return (
        <div>
            <IntentSelector 
                setSelected={(p) => { setSelected(p) }} 
                selected={selected}
                intents={optionButtons}
            />
            <Wortwolke classifications={
                selected ? classifications.filter((c) => c.intent === selected) : classifications
            }/>
        </div>
    );
}