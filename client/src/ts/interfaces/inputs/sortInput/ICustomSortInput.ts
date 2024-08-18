import { ISortOption } from "./ISortOption";

export interface ICustomSortInput {
    sortOption:string,
    sortOptions:ISortOption[],
    setSortOption:(option:ISortOption) => void,
}