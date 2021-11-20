// To-Do Plus
// input.ts
// @author Miroslav Safar (xsafar23)

import { Dispatch, SetStateAction, useState } from "react";

export interface InputBind<S> {
    value: S,
    onChange: (event: any) => void
}

export function useInput<S>(initialValue: S): [S, Dispatch<SetStateAction<S>>, InputBind<S>, () => void] {
    const [value, setValue] = useState(initialValue);

    return [value, setValue, {
        value,
        onChange: event => {
            setValue(event.target.value);
        }
    }, () => setValue(initialValue)]
}