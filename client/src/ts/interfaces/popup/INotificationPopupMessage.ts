import { INotificationMessage } from "../notifications/INotificationMessage";

export interface INotificationPopupMessage {
    notification:INotificationMessage,
    notificationType:'notification' | 'errorNotification' | 'successNotification',
    notificationTimeout: number,
    closeMessage:() => void
}