import React, { useContext } from 'react';
import '../../../../style/css/pages/signInPage/UI/authorizationUI.css';
import AuthorizationLinks from '../../../UI/AuthorizationLinks';
import CustomButton from '../../../UI/buttons/CustomButton';
import CustomInput from '../../../UI/inputs/CustomInput';
import CustomPasswordInput from '../../../UI/inputs/CustomPasswordInput';
import { SignInPageContext } from '../../../../context/SignInPageContext';

const SignInPageAuthorizationUI: React.FC = () => {
  const { authUser, setAuthUserLogin, setAuthUserPassword, authorizationUser } = useContext(SignInPageContext);

  return (
    <div className='signInPageAuthorizationUI'>
      <CustomInput placeholder='Login' onChange={setAuthUserLogin} />
      <CustomPasswordInput placeholder='Password' globalId='signInVisibilityPassword' onChange={setAuthUserPassword} />
      <div className="authorizationUILinksWithButton">
        <CustomButton buttonGlobalId='styledAuthorizationButton' buttonText='Sign in' onClick={() => authorizationUser(authUser)} />
        <AuthorizationLinks />
      </div>
    </div>
  );
};

export default SignInPageAuthorizationUI;
