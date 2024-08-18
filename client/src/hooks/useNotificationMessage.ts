import { Dispatch } from "redux"
import { newNotification } from "../redux/reducers/slices/notificationSlice"
import { IErrorServiceResponse } from "../ts/interfaces/errors/IErrorServiceResponse"
import { SerializedError } from "@reduxjs/toolkit"

type TUseNotificationMessage = {
    dispatch:Dispatch,
    error?:IErrorServiceResponse | SerializedError,
    isSuccess:boolean,
    successMessage:string
}

export default function useNotificationMessage({dispatch, error, isSuccess, successMessage}:TUseNotificationMessage) {

    let notificationMessage: string | undefined
    let messageType:'errorNotification' | 'successNotification' | undefined

  console.log(isSuccess)

    if(error && 'data' in error) { 
      messageType = 'errorNotification'
      if(typeof error.data === 'string') {
        notificationMessage = error.data
      } else {
        Array.isArray(error.data.message) ? notificationMessage = error.data.message[0].message : notificationMessage = error.data.message
      }
    } else if(isSuccess) {
      messageType = 'successNotification'
      notificationMessage = successMessage
    }

  if(notificationMessage && messageType) {
    dispatch(newNotification({message:notificationMessage,type:messageType,id:Date.now()}))
  }
}