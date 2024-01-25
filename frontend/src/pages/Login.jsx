import React, { useState } from 'react'
import {  backendUrl } from '../utils/commonItems'
import { Link, useNavigate } from 'react-router-dom'
import { setLocalItem } from '../utils/local_storage_helpers'
import { changeToken, changeUserData } from '../utils/CounterSlice'

import useCommonItems from '../utils/useCommonItems'

import axios from 'axios'
import CustomToast from '../components/CustomToast'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {dispatch} = useCommonItems()
  const navigate = useNavigate()
  const {visible,setvisible,handleClose,messageToast,toastChangeFunct}=useCommonItems()
  const handleSignUp =async(e)=>{
    e.preventDefault()
    const item = {email,password}
    
    try {
      const res = await axios.post(`${backendUrl}login`,item)
      
      setEmail("")
      setPassword("")
      
      setLocalItem("user",res.data.data)
      setLocalItem("token",res.data.token)
      dispatch(changeUserData(res.data.token))
      dispatch(changeToken(res.data.token))
      toastChangeFunct(res.data.result,res.data.message)
      setvisible(true)
      
      setTimeout(() => {
        navigate("/add_product")  
      }, 3000);
      
    } catch (error) {
      toastChangeFunct(error.response.data.result,error.response.data.message)

      setvisible(true)
    }
    setTimeout(() => {
      setvisible(false)
      toastChangeFunct("","")
    }, 2000);
  }

  const inputClass = 'w-[80%] shadow-[1px_1px_3px_2px_rgba(0,0,0,0.2)] rounded-[10px] h-[45px] mb-6 px-3 ';
  return (
    <div className='Register w-[100%] flex flex-col items-center'>
      <form onSubmit={handleSignUp} className='w-[100%] 400:w-[400px] flex flex-col items-center  py-8 rounded-[10px] mt-[40px] shadow-[1px_2px_3px_3px_rgba(0,0,0,0.2)]'>
      <p className='text-[28px] font-[500] mb-6'>Login</p>
      
      <input type="text" name="Email" value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' id="email" className={`${inputClass}`}/>
     
      <input type="password" name="Password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' id="password" className={`${inputClass}`}/>
      
      <Link to="/register" className=' w-[80%] mb-6 hover:underline cursor-pointer hover:text-[#1170ff]'>Click here to join!!!</Link>

      <button className='bg-[#1170ff] hover:bg-[#5297ff] text-[white] rounded-[10px] px-3 py-2 text-[20px] w-[80%] ' type="submit">Login</button>
      </form>
      <CustomToast visible={visible} onClose={handleClose} messageToast={messageToast} values="flex flex-row justify-center pt-[20px]" />
    </div>
  )
}

export default Login