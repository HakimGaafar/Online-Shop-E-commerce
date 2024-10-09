import React from 'react';
import styles from './VerifyCode.module.css';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { useFormik } from 'formik';

export default function VerifyCode() {
  let navigate =useNavigate()
  function verifyCode(){
    toast.success('Code is valid!',{duration: 5000})
    navigate('/resetpassword')
  }
  
  let validationSchema = Yup.object({
    code:Yup.string().required('Code is required').matches(/^[1-9]\d{5}$/,'Enter the valid code Ex:(123456)')})
  let formik = useFormik({ 
    initialValues:{ 
    code:''
    },validationSchema
    ,onSubmit:verifyCode 
    })
  return <>
    <div  className="container my-5 py-5">
   
   
      <div  className="container">
         <h2 >Please enter your verification code</h2>
         <form onSubmit={formik.handleSubmit} className="ng-untouched ng-pristine ng-invalid">
            <div  className="form-floating mb-3">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange}  type="text" id='code' name='code' placeholder="Your Code" formcontrolname="code" className="form-control ng-untouched ng-pristine ng-invalid"/>
              {formik.errors.code && formik.touched.code? <div className='alert alert-danger py-2 my-2'>{formik.errors.code}</div>:null}
                <label  htmlFor="floatingInput">Code </label></div>
            <button  type="submit" className="btn btn-lg me-auto btn-outline-success">Verify</button>
         </form>
      </div>
   
</div>
  </>
}
