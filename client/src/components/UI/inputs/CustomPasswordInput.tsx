import React from 'react'
import '../../../style/css/inputs/customPasswordInput.css'
import CustomInput from './CustomInput'
import { ICustomInputProps } from '../../../ts/interfaces/inputs/ICustomInputProps'
import VisibilityButton from '../buttons/VisibilityButton'

const CustomPasswordInput:React.FC<ICustomInputProps> = ({value, globalId,placeholder,onChange}) => {

  let [inputType,setInputType] = React.useState<'password' | 'text'>('password')

  function setInputVisibility() {
    const newType = inputType == 'password' ? 'text' : 'password'
    setInputType(newType)
  }

  const isVisible = inputType == 'text'

  return (
    <div className='customPasswordInputContainer'>
      <VisibilityButton className={'visibilityInputButton'} setVisibility={setInputVisibility} isVisibility={isVisible}/>
      <CustomInput value={value} globalId={globalId} type={inputType} placeholder={placeholder} onChange={onChange}/>
    </div>
  )
}

export default CustomPasswordInput
