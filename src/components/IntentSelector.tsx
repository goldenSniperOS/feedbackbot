import React from 'react';

export default function IntentSelector({ intents, setSelected, selected }: 
    { selected: string, setSelected: (p) => void, intents: Array<{ intent: string, percentage: number, original_intent: string }> }) {  
    
    const selectedClasses = "bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300";
    const unSelectedClasses = "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-blue-100 duration-300";

    return (
        <div className='py-2.5'>
            {intents.map(i => {
                const isSelected = i.original_intent === selected;
                return <button 
                        className={`rounded ml-2.5 px-4 py-2 text-xs ${isSelected ? selectedClasses : unSelectedClasses}`}
                        onClick={() => { setSelected(i.original_intent) }}>
                            { i.intent }
                        </button>
            })}
        </div>
    );
}