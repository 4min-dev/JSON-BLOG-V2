import { useMemo } from "react"

type TUsePagination = {
    totalPages:number,
    currPage:number
}

export const usePagination = ({totalPages,currPage}:TUsePagination) => {
    const result:number[] = []

    useMemo(() => {
        for(let i = 1; i<=totalPages; i++) {
            result.push(i)
        }
    },[totalPages,currPage,result])

    return result
}