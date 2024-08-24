import React from 'react'
import '../../../style/css/loaders/spinnerLoader.css'

type TSpinnerLoader = {
  positionType:'fixed' | 'absolute'
}

const SpinnerLoader:React.FC<TSpinnerLoader> = ({positionType}) => {
  return (
    <div className={`spinnerLoaderContainer ${positionType}`}>
      <div className="spinnerLoader">
        <img src='/spinner.gif' alt='loader'/>
      </div>
    </div>
  )
}

export default SpinnerLoader
