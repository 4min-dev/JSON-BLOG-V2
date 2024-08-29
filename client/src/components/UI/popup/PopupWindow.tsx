import React from 'react'
import '../../../style/css/popup/popupWindow.css'

type TPopupWindow = {
    title:string,
    popupClassname?:string,
    setPopupActive:React.Dispatch<React.SetStateAction<boolean>>
    children:React.ReactNode
}

const PopupWindow:React.FC<TPopupWindow> = ({title,popupClassname,setPopupActive,children}) => {
  return (
    <div className={`popupContainer`} onClick={() => setPopupActive(false)}>
      <div className={`popup ${popupClassname}`} onClick={(e) => e.stopPropagation()}>
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  )
}

export default PopupWindow
