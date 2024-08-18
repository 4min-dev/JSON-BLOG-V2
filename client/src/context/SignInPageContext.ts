import React, { createContext } from 'react';
import { IUser } from '../ts/interfaces/users/IUser';

type TDefaultContextValue = {
  authUser:IUser,
  setAuthUser:React.Dispatch<React.SetStateAction<IUser>>,
  setAuthUserLogin:(e:React.ChangeEvent<HTMLInputElement>) => void,
  setAuthUserPassword:(e:React.ChangeEvent<HTMLInputElement>) => void,
  authorizationUser:(user:IUser) => void
}

const defaultContextValue:TDefaultContextValue = {
  authUser:{username:'',password:''},
  setAuthUser:() => {},
  setAuthUserLogin:() => {},
  setAuthUserPassword:() => {},
  authorizationUser:() => {}
}

export const SignInPageContext = createContext(defaultContextValue);
