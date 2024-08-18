import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "../../ts/interfaces/posts/IPost";
import { IErrorServiceResponse } from "../../ts/interfaces/errors/IErrorServiceResponse";
import { IFilterQuery } from "../../ts/interfaces/filterContent/IFilterQuery";
import { INewPostContent } from "../../ts/interfaces/posts/INewPostContent";

type THeaderResponse = {
    "x-total-count":string | number
}

type TGetPostsResponse = {
    data: IPost[],
    headers:THeaderResponse
}

export const postsService = createApi({
    reducerPath:'postsService',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000/posts/'}) as BaseQueryFn<any, unknown, IErrorServiceResponse>,
    tagTypes:['Post'],
    endpoints:(builder) => ({
        getPosts:builder.query<TGetPostsResponse,IFilterQuery>({
            query:(filter) => {

                const searchQuery = filter.searchQuery
                const sortQuery = `${filter.sortQuery.sortKey}:${filter.sortQuery.sortValue}`
                const limitQuery = String(filter.limitQuery)

                const params = new URLSearchParams({
                    query:searchQuery,
                    sort: sortQuery,
                    limit: limitQuery
                }).toString()

                return({
                    url:'getPosts',
                    method:'GET',
                    headers: {
                        'sort':filter.sortQuery,
                        'limit':filter.limitQuery,
                    },
                    params:params
                })
            },
            providesTags:['Post']
        }),
        getPostById:builder.query<IPost,number>({
            query:(postId) => {

                const params = new URLSearchParams({postId:String(postId)})

                return ({
                    url:`getPost`,
                    method:'GET',
                    params:params
                })
            }
        }),
        addNewPost:builder.mutation<IPost,IPost>({
            query:(post) => ({
                url:'newPost',
                method:'POST',
                body:post
            }),
            invalidatesTags:['Post']
        }),
        deletePostById:builder.mutation<IPost,number>({
            query:(postId) => ({
                url:`deletePost/${postId}`,
                method:'DELETE'
            }),
            invalidatesTags:['Post']
        }),
        changePostById:builder.mutation<IPost,INewPostContent>({
            query:(newPost) => ({
                url:`changePost/${newPost.postId}`,
                method:'PUT',
                body:newPost
            }),
            invalidatesTags:['Post']
        })
    })
})