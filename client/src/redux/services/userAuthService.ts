import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../ts/interfaces/users/IUser";
import { IErrorServiceResponse } from "../../ts/interfaces/errors/IErrorServiceResponse";
import { ITransferUserData } from "../../ts/interfaces/users/ITransferUserData";

export const userAuthService = createApi({
    reducerPath:'userAuthService',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000/auth'}) as BaseQueryFn<string | FetchArgs,unknown,IErrorServiceResponse,{}>,
    tagTypes:['Post'],
    endpoints:(builder) => ({
        addNewUser:builder.mutation<IUser,IUser>({
            query:(user) => {
                const formData = new FormData()
                formData.append('image',user.serverAvatar!)
                formData.append('username',user.username)
                formData.append('email',user.email!)
                formData.append('password',user.password)

                return ({
                    url:'signup',
                    method:'POST',
                    body:formData
                })
            },

            invalidatesTags:['Post'],
        }),

        login:builder.mutation<IUser,IUser>({
            query:(user) => ({
                url:'signin',
                method:'POST',
                body:user,
                credentials:'include'
            }),

            invalidatesTags:['Post']
        }),

        verifyUserToLogin:builder.query<ITransferUserData,void>({
            query:() => ({
                url:'signin/verify',
                method:'GET',
                credentials:'include'
            })
        }),

        verifyUserByPassword:builder.mutation<{isUserVerifyed:boolean, verifyedUser:IUser},{userId:string | number, password:string, verifyPassword:string}>({
            query:(verifyedUser) => ({
                url:`verifyUserByPassword`,
                method:'POST',
                body:verifyedUser
            }),

            invalidatesTags:['Post']
        }),

        logoutUser:builder.mutation<void,void>({
            query:() => ({
                url:'logout',
                method:'PUT',
                credentials:'include'
            })
        }),

        findUserByUsername:builder.query<ITransferUserData,string>({
            query:(username) => ({
                url:`getUserByUsername/${username}`,
                method:'GET'
            })
        }),

        findUserById:builder.query<ITransferUserData,string>({
            query:(userId) => ({
                url:`getUserById/${userId}`,
                method:'GET'
            })
        }),

        changeUserData:builder.mutation<IUser, IUser>({
            query:(newUserData) => {

                const formData = new FormData()

                formData.append('image',newUserData.serverAvatar!)
                formData.append('username',newUserData.username)
                formData.append('email',newUserData.email!)
                formData.append('password',newUserData.password)

                return ({
                    url:`changeUserData/${newUserData.userId}`,
                    method:'PUT',
                    body:formData
            })},

            invalidatesTags:['Post']
        })
    })
})