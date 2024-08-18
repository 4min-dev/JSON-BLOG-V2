import { IComment } from "./IComment";

export interface IPost {
    postId:number,
    author:string,
    title:string,
    body:string,
    comments?: IComment[]
}