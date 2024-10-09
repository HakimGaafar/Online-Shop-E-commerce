import React, { useEffect, useState } from 'react';
import styles from './ForgotPassword.module.css';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { useFormik } from 'formik';



export default function ForgotPassword() {
  let navigate =useNavigate()

  function verifyEmail(){
    toast.success('Email verified!',{duration: 5000})
    navigate('/verifycode')  
    }
    
    let validationSchema = Yup.object({
      email:Yup.string().required('Email is required').email('Invalid Email')})
    let formik = useFormik({ 
      initialValues:{ 
      email:''
      },validationSchema
      ,onSubmit:verifyEmail 
      })
    
    
  
  return <>
  <div  className="container my-5 py-5 position-relative">
  

  <div  className="container">
     <h2 >Please enter your Email</h2>
     <form onSubmit={formik.handleSubmit}  className="ng-untouched ng-pristine ng-invalid mb-4">
        <div  className="form-floating mb-3">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' placeholder='name@example.com' formcontrolname="email" className="form-control ng-untouched ng-pristine ng-invalid"/>
          {formik.errors.email && formik.touched.email? <div className='alert alert-danger py-2 my-2'>{formik.errors.email}</div>:null}
            <label  htmlFor="email">Email</label>
            </div>
            <button  type="submit" className="btn btn-lg me-auto btn-outline-success">Verify</button>
     </form>
     
  </div>
  
  </div>

  
  </>
}
