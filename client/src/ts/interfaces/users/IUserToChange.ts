export interface IUserToChange {
    userId:string,
    username:string,
    email:string,
    avatar?:File | Blob | null,
    password:string
}