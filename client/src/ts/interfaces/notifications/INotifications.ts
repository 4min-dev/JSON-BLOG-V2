import { INotificationMessage } from "./INotificationMessage";

export interface INotifications {
    errorMessages:INotificationMessage[],
    successMessages:INotificationMessage[]
}