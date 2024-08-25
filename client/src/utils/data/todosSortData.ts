import { ISortOption } from "../../ts/interfaces/inputs/sortInput/ISortOption";

export const todosSortData:ISortOption[] = [
    {
        name:'Sort..',
        sortKey:'',
        sortValue:null
    },
    {
        name:'Title ↓',
        sortKey:'title',
        sortValue:1
    },
    {
        name:'Title ↑',
        sortKey:'title',
        sortValue:-1
    },
    {
        name:'Completed ↓',
        sortKey:'completed',
        sortValue:-1
    },
    {
        name:'Completed ↑',
        sortKey:'completed',
        sortValue:1
    }
]