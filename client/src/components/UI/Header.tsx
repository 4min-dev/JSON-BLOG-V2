import React from 'react'
import '../../style/css/header/header.css'
import WebsiteTitleLogo from './WebsiteTitleLogo'
import NavbarLinks from './NavbarLinks'
import ProfileLink from './profileLinks/ProfileLink'

const Header:React.FC = () => {

  return (
    <header>
      <WebsiteTitleLogo/>
      <NavbarLinks/> 
      <ProfileLink/>
    </header>
  )
}

export default Header
