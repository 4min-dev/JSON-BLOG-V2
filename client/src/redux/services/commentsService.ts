
import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IErrorServiceResponse } from "../../ts/interfaces/errors/IErrorServiceResponse";
import { IComment } from "../../ts/interfaces/posts/IComment";

export const commentsService = createApi({
    reducerPath:'commentsService',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000/comments/'}) as BaseQueryFn<any, unknown, IErrorServiceResponse>,
    tagTypes:['Post'],
    endpoints:(builder) => ({
        getPostComment:builder.query<IComment[],string | number>({
            query:(postId) => ({
                url:`getPostComments/${postId}`,
                method:'GET'
            }),
            providesTags:['Post']
        }),
        newPostComment:builder.mutation<IComment,IComment>({
            query:(comment) => ({
                url:'newPostComment',
                method:'POST',
                body:comment
            }),
            invalidatesTags:['Post']
        }),
        deleteCommentById:builder.mutation<IComment,string | number>({
            query:(id) => ({
                url:`deleteComment/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Post']
        }),
        changePostById:builder.mutation<IComment, IComment>({
            query:(comment) => ({
                url:`changeComment/${comment.id}`,
                method:'PUT',
                body:comment
            }),
            invalidatesTags:['Post']
        })
    })
})