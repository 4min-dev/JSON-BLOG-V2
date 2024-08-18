import { INotificationMessage } from "./INotificationMessage";

export interface INotificationMessageProps {
    messageData:INotificationMessage[],
    closeMessage:(id:string | number) => void
}