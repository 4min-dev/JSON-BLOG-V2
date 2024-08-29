import React from 'react'
import CustomPasswordInput from '../../../UI/inputs/CustomPasswordInput'
import CustomButton from '../../../UI/buttons/CustomButton'

type TVerifyUserStage = {
    passwordHandler:(event:React.ChangeEvent<HTMLInputElement>) => void,
    verifyPasswordHandler:(event:React.ChangeEvent<HTMLInputElement>) => void,
    verifyUserByPasswordHandler:() => void
}

const VerifyUserStage:React.FC<TVerifyUserStage> = ({passwordHandler,verifyPasswordHandler,verifyUserByPasswordHandler}) => {
  return (
    <div className='verifyUserStageContainer'>
      <CustomPasswordInput type='text' placeholder='Password' onChange={passwordHandler}/>
      <CustomPasswordInput type='text' placeholder='Repeat password' onChange={verifyPasswordHandler}/>
      <CustomButton buttonText='Verify' onClick={verifyUserByPasswordHandler}/>
    </div>
  )
}

export default VerifyUserStage
