import React from "react";

type InputProps = {
    className: string,
    value: string,
    disabled: boolean,
    onChange?: any
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({className, value, disabled, onChange}, ref) => {

    return <input 
        type="text" 
        className={className} 
        value={value} 
        disabled={disabled} 
        ref={ref}
        onChange={onChange}
        autoFocus={false}
    />
});

Input.displayName = 'SendInput';

export default Input;
