import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TRootState } from "../ts/types/TRootState";

export const useTypedSelector:TypedUseSelectorHook<TRootState> = useSelector