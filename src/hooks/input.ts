// To-Do Plus
// input.ts
// @author Miroslav Safar (xsafar23)

import { Dispatch, SetStateAction, useState } from "react";

/**
 * Properies for Input Component 
 **/ 
export interface InputBind<S> {
    value: S,
    onChange: (event: any) => void
}

/**
 * Hook for handling inputs 
 * @param initialValue Initival value of the input field 
 * @returns Array of [value, setValue, bindInputField, resetInput]
 */
export function useInput<S>(initialValue: S): [S, Dispatch<SetStateAction<S>>, InputBind<S>, () => void] {
    const [value, setValue] = useState(initialValue);

    return [value, setValue, {
        value,
        onChange: event => {
            setValue(event.target.value);
        }
    }, () => setValue(initialValue)]
}
