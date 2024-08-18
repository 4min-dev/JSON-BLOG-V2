import { ISortOption } from "../inputs/sortInput/ISortOption";

export interface IFilterQuery {
    searchQuery:string,
    sortQuery:ISortOption,
    limitQuery:number,
    totalContentCount:number | null
}