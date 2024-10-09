import React, { useContext } from 'react';
import styles from './ShippingAddress.module.css';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext.js';
import { Helmet } from 'react-helmet';

export default function ShippingAddress() {
  let {cartId} = useParams()
  let {checkOutSession} = useContext(CartContext)
  async function checkOut(values){
    let {data} = await checkOutSession(cartId, values)
    if(data.status == 'success'){
      window.location.href = data.session.url
    }
  }
  
  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },onSubmit:checkOut
  })
  return <>
  <Helmet>
        <meta charSet="utf-8" />
        <title>Shipping Address</title>
      </Helmet>
    
    <div className="w-75 mx-auto mt-4">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details">Details</label>
        <input type="text" id='details' name='details' className='form-control mb-3' onChange={formik.handleChange} />
        <label htmlFor="phone">Phone</label>
        <input type="tel" id='phone' name='phone' className='form-control mb-3' onChange={formik.handleChange} />
        <label htmlFor="city">City</label>
        <input type="text" id='city' name='city' className='form-control mb-3' onChange={formik.handleChange} />
        <button className='btn bg-main text-light mb-1 mt-4 w-100 ' type='submit'>Checkout</button>
      </form>
    </div>
  </>
}
