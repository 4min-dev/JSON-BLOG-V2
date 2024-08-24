export interface IUser {
    username:string,
    email?:string,
    serverAvatar?:File | Blob | null
    password:string
}