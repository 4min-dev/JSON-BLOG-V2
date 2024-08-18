import React from 'react';
import Header from '../../UI/Header';
import AsidePan from '../../UI/AsidePan';
import BackButton from '../../UI/buttons/BackButton';
import SignUpPageContent from './UI/SignUpPageContent';
import Notifications from '../../UI/popup/Notifications';
import { userAuthService } from '../../../redux/services/userAuthService';
import { useDispatch } from 'react-redux';
import { IUser } from '../../../ts/interfaces/users/IUser';
import useNotificationMessage from '../../../hooks/useNotificationMessage';
import SpinnerLoader from '../../UI/loaders/SpinnerLoader';

const SignUpPage: React.FC = () => {

  const dispatch = useDispatch()

  const [addNewUser, { error,isSuccess,isLoading,data }] = userAuthService.useAddNewUserMutation();

  async function newUser(authUser:IUser) {

    const user = authUser.serverAvatar ? authUser : {
      username:authUser.username,
      password:authUser.password,
      email:authUser.email
    }

    await addNewUser(user)
  }

  React.useEffect(() => {
    
    let successMessage:string = `${data?.username} successfully register`
    useNotificationMessage({dispatch,error,isSuccess,successMessage})

  }, [error, isSuccess]);

  return (
    <div className='signUpPageContainer'>
    {isLoading && <SpinnerLoader/>}
      <Header />
      <AsidePan>
        <BackButton />
      </AsidePan>
      <SignUpPageContent addNewUser={newUser} />
      <Notifications />
    </div>
  );
}

export default SignUpPage;
