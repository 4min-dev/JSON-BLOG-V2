import React from 'react'
import NotificationPopupMessage from '../cards/NotificationPopupMessage'
import List from '../lists/List'
import { filterInvalidNotifications } from '../../../redux/reducers/slices/notificationSlice'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'

const Notifications:React.FC = () => {

  const selector = useTypedSelector(state => state.notificationSlice)
  const dispatch = useDispatch()

  return (
    <>
    {selector.notifications.length > 0 &&
      <div className='notificationMessageContainer'>
      <List items={selector.notifications} renderItem={(notification) => 
         <NotificationPopupMessage key={notification.id} notificationType={notification.type} notification={notification} closeMessage={() => dispatch(filterInvalidNotifications(notification.id))} notificationTimeout={10}/>}>
      </List>
     </div>
    }
    </>
  )
}

export default Notifications
