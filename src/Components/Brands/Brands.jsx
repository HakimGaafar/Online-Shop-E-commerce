import React from 'react';
import styles from './Brands.module.css';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Brands() {
  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
 

  let {data , isLoading , isError , isFetching} = useQuery('Brands', getBrands)

  return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>
      <h1 className='d-flex justify-content-center align-items-center my-4 text-main fw-bold'>All Brands</h1>
      {isLoading?<div className='loading'>
    <div >
      <BallTriangle
         height={100}
         width={100}
         radius={5}

         ariaLabel='ball-triangle-loading'
         wrapperStyle={{}}
         wrapperClass="d-flex justify-content-center mt-5"
         visible={true}
      />
    </div>
    </div>
  :<>
  
  <div className="row gy-4 mt-2 ">
  {data?.data.data.map(brand =><div key={brand._id} className='col-md-3 position-relative' >
  <Link> <div className="product p-2" >
    <img src={brand.image} className='w-100' alt={brand.name} />
   <h3 className='h5 text-black'>{brand.name}</h3>
   
   </div>
  </Link>
   
  </div>
  
  )}
  

  </div>
  </>
  }
  </>
}
