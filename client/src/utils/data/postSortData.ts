import { ISortOption } from "../../ts/interfaces/inputs/sortInput/ISortOption"

export const postSortData:ISortOption[] = [
    {
        name:'Sort..',
        sortKey:'',
        sortValue:0
    },
    {
        name:'Author ↑',
        sortKey:'author',
        sortValue:1
    },
    {
        name:'Author ↓',
        sortKey:'author',
        sortValue:-1
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
        name:'Comments ↑',
        sortKey:'commentsCount',
        sortValue:1
    },
    {
        name:'Comments ↓',
        sortKey:'commentsCount',
        sortValue:-1
    },
]