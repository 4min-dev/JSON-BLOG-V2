import React from 'react'
import '../../style/css/asidePan/asidePan.css'

type TAsidePanProps = {
    children?:React.ReactNode
}

const AsidePan:React.FC<TAsidePanProps> = ({children}) => {
  return (
    <aside>
      {children}
    </aside>
  )
}

export default AsidePan
