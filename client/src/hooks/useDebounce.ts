import { useCallback, useRef } from "react";

type TUseDebounce = {
    callback:(...args:any) => unknown,
    delay:number
}

export default function useDebounce({callback,delay}:TUseDebounce) {
    const timer = useRef(0)

    const debouncedCallback = useCallback((...args:any) => {
        if(timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay);
    },[callback,delay])

    return debouncedCallback
}