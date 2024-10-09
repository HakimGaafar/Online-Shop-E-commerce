import React from 'react';
import styles from './AllOrders.module.css';
import { Link } from 'react-router-dom';

export default function AllOrders() {
  return <>
    
    <div className="d-flex flex-column justify-justify-content-evenly align-items-center mt-3">
    <h1 className='my-5 text-main fs-1 fw-bold border-5 border-bottom m-0'>AllOrders</h1>
  <p className='fw-bold fs-1 my-3'>You've completed your order!</p>
  <Link to={'/'} className='bg-main btn text-white mb-4'>Back to homepage</Link>

  </div>
  </>
}
