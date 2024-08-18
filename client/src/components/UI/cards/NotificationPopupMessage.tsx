import React from 'react'
import '../../../style/css/popup/notificationPopupMessage.css'
import { INotificationPopupMessage } from '../../../ts/interfaces/popup/INotificationPopupMessage'
import CloseButton from '../buttons/CloseButton'

const NotificationPopupMessage:React.FC<INotificationPopupMessage> = ({notification,notificationType,notificationTimeout,closeMessage}) => {

    let [windowTimeout,setWindowTimeout] = React.useState<number>(notificationTimeout)

    React.useEffect(() => {
        if(windowTimeout) {
            const intervalId = setInterval(() => setWindowTimeout(prev => prev - 1),1000)
            return () => clearInterval(intervalId)
        }
        closeMessage()
    },[windowTimeout])

  return (
      <div key={notification.id} className={`notificationMessage ${notificationType}`}>
      <div className='notificationMessageTimeoutContainer'>
         <h1>Window be closed after {windowTimeout}s</h1>
         <CloseButton closeHandler={closeMessage}/>
      </div>
        <h1>{notification.message}</h1>
      </div>
  )
}

export default NotificationPopupMessage
