export interface IUser {
    userId?:string,
    username:string,
    email?:string,
    clientAvatar?:string,
    serverAvatar?:File | Blob | null
    password:string
}