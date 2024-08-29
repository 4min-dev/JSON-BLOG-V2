import { IComment } from "./IComment";

type IPostAuthor = {
    username:string,
    _id:string
}

export interface IPost {
    postId:number,
    author:IPostAuthor,
    title:string,
    body:string,
    comments?: IComment[]
}