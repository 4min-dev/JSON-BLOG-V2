import React from 'react'
import '../../style/css/footer/footer.css'
import WebsiteTitleLogo from './WebsiteTitleLogo'
import NavbarLinks from './NavbarLinks'
import UpButton from './buttons/UpButton'

const Footer:React.FC = () => {
  return (
    <footer>
      <WebsiteTitleLogo/>
      <NavbarLinks/>
      <div className='footerInteractive'>
        <UpButton/>
        <div className="footerAuthorContent">
            <h4>© 4min-dev</h4>
        </div>
      </div>
    </footer>
  )
}

export default Footer
