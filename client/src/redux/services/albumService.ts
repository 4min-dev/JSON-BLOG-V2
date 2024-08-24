import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IErrorServiceResponse } from "../../ts/interfaces/errors/IErrorServiceResponse";
import { IAlbum } from "../../ts/interfaces/albums/IAlbum";
import { IFilterQuery } from "../../ts/interfaces/filterContent/IFilterQuery";
import { IAlbumPhoto } from "../../ts/interfaces/albums/IAlbumPhoto";

type THeaderResponse = {
    "x-total-count":string | number
}

type TGetAlbumsResponse = {
    data:IAlbum[],
    headers:THeaderResponse
}

export const albumService = createApi({
    reducerPath:'albumService',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000/albums/'}) as BaseQueryFn<any, unknown, IErrorServiceResponse>,
    endpoints:(builder) => ({
        getAlbums:builder.query<TGetAlbumsResponse, IFilterQuery>({
            query:(filter) => {

                const searchQuery = filter.searchQuery
                const pageQuery = String(filter.currPage)
                const sortQuery = `${filter.sortQuery.sortKey}:${filter.sortQuery.sortValue}`
                const limitQuery = String(filter.limitQuery)

                const filterParams = new URLSearchParams({
                    query:searchQuery,
                    sort:sortQuery,
                    limit:limitQuery,
                    page:pageQuery
                }).toString()

                return ({
                    url:'getAlbums',
                    method:'GET',
                    params:filterParams
                })
            }
        }),
        getAlbumPhotos:builder.query<IAlbumPhoto[],number>({
            query:(albumId) => ({
                url:`getPhotos/${albumId}`,
                method:'GET'
            })
        })
    })
})