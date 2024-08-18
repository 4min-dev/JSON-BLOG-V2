export interface IUser {
    username:string,
    email?:string,
    previewAvatar?:string,
    serverAvatar?:File | Blob | null
    password:string
}