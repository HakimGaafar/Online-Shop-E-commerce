import React, { useContext } from 'react';
import styles from './Products.module.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext.js';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../../Context/WishlistContext.js';

export default function Products() {
  function getProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  let {data , isLoading , isError , isFetching} = useQuery('Products', getProducts)
  let {addToCart} = useContext(CartContext)
  let {addToWishlist} = useContext(WishlistContext)
  async function postToCart(id){
    let {data} = await addToCart(id);
    if(data.status == 'success'){
      toast.success(data.message,{
        duration:5000
      })
    }

  }
  async function postToWishlist(id){
    let {data} = await addToWishlist(id);
    if(data.status == 'success'){
      toast.success(data.message,{
        duration:5000
      })
    }

  }
  return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <h1 className='d-flex justify-content-center align-items-center my-4 text-main fw-bold'>All Products</h1>
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
  
  <div className="row gy-4">
  {data?.data.data.map(product => 
    
    <div key={product.id} className="col-lg-2 p-2">
      
    <div className="product p-2 position-relative">
    <Link to={`/productdetails/${product.id}`}>
      <img src={product.imageCover} className='w-100' alt={product.title} />
      <span className='font-sm text-main'>{product.category.name}</span>
      <h3 className='h5 text-black'>{product.title.split(' ').splice(0,2).join(' ')}</h3>
      <div className="d-flex py-3 justify-content-between align-items-center">
        <span className='font-sm text-black'>{product.price} EGP</span>
        <span className='font-sm text-black'>
          <i className='fas fa-star rating-color me-1'></i>
          {product.ratingsAverage}</span>
      </div>
      </Link>
      <span><button onClick={()=>postToWishlist(product.id)} className=' border-0 text-black bg-white position-absolute wishlist'><i className="fa-solid fa-heart"></i></button></span>
   <button onClick={()=>postToCart(product.id)} className='btn bg-main text-main-light w-100 btn-sm'><i class="fa-solid fa-plus"></i> Add to cart</button>
    </div>
   
    </div>
    
  )}
  </div>
  </>
  }
  </>
}