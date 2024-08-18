import { IFilterQuery } from "../ts/interfaces/filterContent/IFilterQuery"
import useDebounce from "./useDebounce"

type TUseScrollContentLoad = {
  filter:IFilterQuery,
  setFilter:React.Dispatch<React.SetStateAction<IFilterQuery>>
}

export default function useScrollContentLoad({filter,setFilter}:TUseScrollContentLoad) {
    return useDebounce({callback() {

        const scrollTop = window.scrollY
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
  
        const totalScrollPosition = scrollTop + clientHeight
  
       if(filter.totalContentCount) {
        if(
          totalScrollPosition >= scrollHeight - 200
          && (filter.totalContentCount != filter.limitQuery && filter.limitQuery < filter.totalContentCount)) {
          setFilter((prevFilters) => ({
            ...prevFilters,
            limitQuery:prevFilters.limitQuery + 10
          }))
        }
       }
        
    },delay:300})
}