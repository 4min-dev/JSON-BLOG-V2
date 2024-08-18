
import { IErrorWithId } from "../errors/IErrorWithId";

export interface INotificationMessage extends IErrorWithId {
    type:'notification' | 'errorNotification' | 'successNotification'
}