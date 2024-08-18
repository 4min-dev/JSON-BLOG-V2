import React from 'react'
import '../../style/css/navbar/navbarLinks.css'

const NavbarLinks:React.FC = () => {
  return (
    <ul>
      <li>
        <a href='#'><h2>Posts</h2></a>
      </li>
      <li>
        <a href='#'><h2>Albums</h2></a>
      </li>
      <li>
        <a href='#'><h2>Todolist</h2></a>
      </li>
    </ul>
  )
}

export default NavbarLinks
