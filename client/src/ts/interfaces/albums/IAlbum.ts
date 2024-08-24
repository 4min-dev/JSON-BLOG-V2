import { IAlbumPhoto } from "./IAlbumPhoto";

export interface IAlbum {
    title:string,
    albumId:number,
    userId:string,
    photos:IAlbumPhoto[]
}