import React from "react"
import useDebounce from "./useDebounce"
import { IFilterQuery } from "../ts/interfaces/filterContent/IFilterQuery"

type TUseDebounceSearch = {
    setFilter:React.Dispatch<React.SetStateAction<IFilterQuery>>
}

export default function useDebounceSearch({setFilter}:TUseDebounceSearch) {
    return useDebounce({callback(event:React.ChangeEvent<HTMLInputElement>) {
        const query = event.target.value
  
        setFilter((prevOptions) => ({
          ...prevOptions,
          searchQuery:query
        }))
    },delay:300})
}