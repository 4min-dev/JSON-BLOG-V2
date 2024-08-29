import React from 'react'
import '../../../style/css/pages/profilePage/profilePage.css'
import Header from '../../UI/Header'
import AsidePan from '../../UI/AsidePan'
import BackButton from '../../UI/buttons/BackButton'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import CustomButton from '../../UI/buttons/CustomButton'
import NewUserDataPopup from './UI/NewUserDataPopup'
import Notifications from '../../UI/popup/Notifications'
import { userAuthService } from '../../../redux/services/userAuthService'
import SpinnerLoader from '../../UI/loaders/SpinnerLoader'

const ProfilePage:React.FC = () => {

    const params = useParams()
    const selector = useTypedSelector(state => state.sessionUserSlice)

    const { data:user, isLoading } = userAuthService.useFindUserByIdQuery(params.userId!)

    let [isChangeUserDataPopup, setChangeUserDataPopup] = React.useState<boolean>(false)

    function setChangeUserDataPopupHandler() {
        setChangeUserDataPopup(!isChangeUserDataPopup)
    }

  return (
    <div className='profilePageContainer'>
      {(params.userId == selector.user.userId && isChangeUserDataPopup) && <NewUserDataPopup setPopupActive={setChangeUserDataPopup} userId={selector.user.userId}/>}
      <Header/>
      <AsidePan>
        <BackButton/>
        {params.userId == selector.user.userId 
          && <CustomButton buttonGlobalId='changeUserDataAsideButton' buttonPathToImage={'/settings.png'} onClick={setChangeUserDataPopupHandler}/>}
      </AsidePan>
      <div className="profilePageUserContent">
        {isLoading
          ? <SpinnerLoader positionType='fixed'/> 
            : user && 
            <>
              <img src={user.avatar ? user.avatar : '/person.png'}/>
              <h3>{user.username}</h3>
              <h3>{user.email}</h3>
            </>}
        
      </div>
      <Notifications/>
    </div>
  )
}

export default ProfilePage
