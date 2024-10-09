import React, {useContext, useState} from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.js';

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  let navigate =useNavigate()
  let {setUserToken} = useContext(UserContext)

  async function loginSubmit(values){
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .catch((err)=>{
      setApiError(err.response.data.message)
      setLoading(false)
    })
    if(data.message == 'success')
    {
      setLoading(false);
      localStorage.setItem('userToken',data.token)
      setUserToken(data.token)
      navigate('/');
    }
  }
  let validationSchema = Yup.object({
    email:Yup.string().required('Email is required').email('Invalid Email'),
    password:Yup.string().required('Password is required').matches(/^[A-Z][\w\W]{5,10}$/,'Invalid Password Ex:(Ahmed123)')
    
   })
   
  let formik = useFormik({ 
    initialValues:{ 
    email:'',  
    password:''
    },validationSchema
    ,onSubmit:loginSubmit 
    })
  return <>
  <div className="w-75 mx-auto py-4 mb-5 mt-5">
     <h2>Login</h2>
     <form onSubmit={formik.handleSubmit} className='position-relative'>
      {apiError?<div className="alert alert-danger">{apiError}</div>:null}
      
      <label htmlFor="email">Email :</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
      {formik.errors.email && formik.touched.email? <div className='alert alert-danger py-2'>{formik.errors.email}</div>:null}

      <label htmlFor="password">Password :</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' className='form-control mb-3' />
      {formik.errors.password && formik.touched.password? <div className='alert alert-danger py-2'>{formik.errors.password}</div>:null}

      
      
      {loading?<button type='button' className='btn bg-main text-light'>
        <BallTriangle
         height={25}
         width={25}
         radius={5}
         color='#fff'
         ariaLabel='ball-triangle-loading'
         wrapperStyle={{}}
         wrapperClass=''
         visible={true}
      />
      </button>:<button disabled={!formik.isValid && formik.dirty} type='submit' className='btn bg-main text-light '>Login</button>}
      <Link className='ps-3 text-decoration-none text-black mb-5' to={'/register'}>Register Now</Link>
      <Link className='position-absolute end-0 ps-3 text-decoration-none text-black mb-5 link' to={'/forgotpassword'}>Forgot Your Password?</Link>

      
      
     </form>

  </div>

    
  </>
}
