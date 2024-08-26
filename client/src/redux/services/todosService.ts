import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITodo } from "../../ts/interfaces/todos/ITodo";
import { IFilterQuery } from "../../ts/interfaces/filterContent/IFilterQuery";
import { IErrorServiceResponse } from "../../ts/interfaces/errors/IErrorServiceResponse";

type THeaderResponse = {
    "x-total-count":string | number
}

type TGetUsersTodoResponse = {
    data:ITodo[],
    headers:THeaderResponse
}

export const todosService = createApi({
    reducerPath:'todosService',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000/todos/'}) as BaseQueryFn<any, unknown, IErrorServiceResponse>,
    tagTypes:['Post'],
    endpoints:(builder) => ({
        getUserTodos:builder.query<TGetUsersTodoResponse, {userId:string, filter:IFilterQuery}>({
            query:({userId, filter}) => {
                const params = new URLSearchParams({
                    query:String(filter.searchQuery),
                    limit:String(filter.limitQuery),
                    sort:`${filter.sortQuery.sortKey}:${filter.sortQuery.sortValue}`,
                    page:String(filter.currPage)
                })

                return ({
                    url:`getUserTodos/${userId}`,
                    method:'GET',
                    params:params
                })
            },
            providesTags:['Post']
        }),
        newTodo:builder.mutation<ITodo,ITodo>({
            query:(newTodo) => ({
                url:'addNewTodo',
                method:'POST',
                body:newTodo
            }),
            invalidatesTags:['Post']
        }),
        completeTodo:builder.mutation<ITodo, number>({
            query:(todoId) => ({
                url:`completeTodo/${todoId}`,
                method:'PUT'
            }),
            invalidatesTags:['Post']
        })
    })
})