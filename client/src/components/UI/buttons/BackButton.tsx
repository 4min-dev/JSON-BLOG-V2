import React from 'react'
import '../../../style/css/buttons/backButton.css'
import { TCustomButtonProps } from '../../../ts/interfaces/buttons/TCustomButtonProps'
import CustomButton from './CustomButton'
import { useNavigate } from 'react-router-dom'

const BackButton:React.FC<TCustomButtonProps> = ({id}) => {

  const navigate = useNavigate()

  function goBack() {
    navigate(-1)
  }

  return (
    <CustomButton buttonGlobalId='backButton' id={id} buttonText='Back' onClick={goBack}/>
  )
}

export default BackButton
