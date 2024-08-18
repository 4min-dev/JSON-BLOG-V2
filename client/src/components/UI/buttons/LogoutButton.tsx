import React from 'react'
import '../../../style/css/buttons/logoutButton.css'

type TLogoutButton = {
    logoutHandler:() => void
}

const LogoutButton:React.FC<TLogoutButton> = ({logoutHandler}) => {
  return (
    <button className='logoutButton' type='button' onClick={() => logoutHandler()}>
        <h4>Unsign</h4>
    </button>
  )
}

export default LogoutButton
