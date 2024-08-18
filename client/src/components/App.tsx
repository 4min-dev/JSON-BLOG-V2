import React from 'react'
import '../style/css/main.css'
import { RouterProvider } from 'react-router-dom'
import { userAuthService } from '../redux/services/userAuthService'
import { useDispatch } from 'react-redux'
import Router from '../routes/Router'
import { newUserSession } from '../redux/reducers/slices/sessionUserSlice'

const App:React.FC = () => {

  const dispatch = useDispatch()
  const {data:verifyedUserData, isLoading, isSuccess} = userAuthService.useVerifyUserToLoginQuery()

  const routerCollection = new Router()
  const router = isSuccess ? routerCollection.privateRoutes() : routerCollection.publicRoutes()

  React.useEffect(() => {
    if(verifyedUserData) {
      dispatch(newUserSession(verifyedUserData))
    }
  },[isSuccess])

  return (
    <React.StrictMode>
        {isLoading ? <h1>Waiting..</h1> : <RouterProvider router={router}/>}
    </React.StrictMode>
  )
}

export default App
