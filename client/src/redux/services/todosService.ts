import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITodo } from "../../ts/interfaces/todos/ITodo";
import { IFilterQuery } from "../../ts/interfaces/filterContent/IFilterQuery";

type THeaderResponse = {
    "x-total-count":string | number
}

type TGetUsersTodoResponse = {
    data:ITodo[],
    headers:THeaderResponse
}

export const todosService = createApi({
    reducerPath:'todosService',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000/todos/'}),
    endpoints:(builder) => ({
        getUserTodos:builder.query<TGetUsersTodoResponse, {userId:string, filter:IFilterQuery}>({
            query:({userId, filter}) => {
                const params = new URLSearchParams({
                    query:String(filter.searchQuery),
                    limit:String(filter.limitQuery),
                    sort:`${filter.sortQuery.sortKey}:${filter.sortQuery.sortValue}`
                })

                return ({
                    url:`getUserTodos/${userId}`,
                    method:'GET',
                    params:params
                })
            }
        })
    })
})