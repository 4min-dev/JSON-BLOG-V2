import React from 'react'
import '../../../style/css/loaders/spinnerLoader.css'

const SpinnerLoader:React.FC = () => {
  return (
    <div className='spinnerLoaderContainer'>
      <div className="spinnerLoader">
        <img src='/spinner.gif' alt='loader'/>
      </div>
    </div>
  )
}

export default SpinnerLoader
