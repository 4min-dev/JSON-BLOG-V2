import { ISortOption } from "../../ts/interfaces/inputs/sortInput/ISortOption"

export const postSortData:ISortOption[] = [
    {
        name:'Sort..',
        sortKey:'',
        sortValue:0
    },
    {
        name:'Title ↑',
        sortKey:"title",
        sortValue:1
    },
    {
        name:'Title ↓',
        sortKey:"title",
        sortValue:-1
    },
    {
        name:'Body ↑',
        sortKey:"body",
        sortValue:1
    },
    {
        name:'Body ↓',
        sortKey:"body",
        sortValue:-1
    },
    {
        name:'comments ↑',
        sortKey:'commentsCount',
        sortValue:1
    },
    {
        name:'comments ↓',
        sortKey:'commentsCount',
        sortValue:-1
    },
]