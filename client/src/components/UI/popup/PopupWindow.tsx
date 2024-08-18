import React from 'react'
import '../../../style/css/popup/popupWindow.css'

type TPopupWindow = {
    title:string,
    setPopupActive:React.Dispatch<React.SetStateAction<boolean>>
    children:React.ReactNode
}

const PopupWindow:React.FC<TPopupWindow> = ({title,setPopupActive,children}) => {
  return (
    <div className='popupContainer' onClick={() => setPopupActive(false)}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  )
}

export default PopupWindow
