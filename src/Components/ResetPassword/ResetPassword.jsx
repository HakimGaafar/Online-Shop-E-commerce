import React from 'react';
import styles from './ResetPassword.module.css';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { useFormik } from 'formik';

export default function ResetPassword() {
  let navigate =useNavigate()

  function resetPassword(){
    toast.success('Password has reset successfully!',{duration: 5000})
    navigate('/login')
  }
  let validationSchema = Yup.object({
    email:Yup.string().required('Email is required').email('Invalid Email'),
    password:Yup.string().required('Password is required').matches(/^[A-Z][\w\W]{5,10}$/,'Invalid Password Ex:(Ahmed123)')})
  let formik = useFormik({ 
    initialValues:{ 
    email:'',  
    password:''
    },validationSchema
    ,onSubmit:resetPassword 
    })
  
  return <>
    <div  className="contaianer my-5 py-5 position-relative">
   
  
      <div  className="container">
         <h2 >Reset your account password</h2>
         <form  onSubmit={formik.handleSubmit} className="ng-dirty ng-touched ng-valid">
            <div  className="form-floating mb-3">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange}  type="email" id='email' name='email' placeholder="Your Email" formcontrolname="email" className="form-control ng-dirty ng-valid ng-touched"/>
              {formik.errors.email && formik.touched.email? <div className='alert alert-danger py-2 my-2'>{formik.errors.email}</div>:null}
              <label  htmlFor="email">Email </label></div>
            <div  className="form-floating mb-3">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' placeholder="Your NewPassword" formcontrolname="newPassword" className="form-control ng-dirty ng-valid ng-touched"/>
              {formik.errors.password && formik.touched.password? <div className='alert alert-danger py-2 my-2'>{formik.errors.password}</div>:null}
              <label  htmlFor="password">Password </label></div>
            <button   type="submit" className="btn btn-lg me-auto btn-outline-success my-3">Reset Password</button>
         </form>
      </div>
   
</div>
  </>
}
