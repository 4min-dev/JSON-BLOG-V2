import React from 'react'
import '../../../style/css/buttons/upButton.css'

const UpButton:React.FC = () => {

  function goUp() {
    window.scrollTo({behavior:'smooth',top:0})
  }

  return (
    <button type='button' className='upButton' onClick={goUp}>
      <h1>Up ↑</h1>
    </button>
  )
}

export default UpButton
