import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../Context/CartContext.js';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';


export default function Cart() {
  let {getCartItems , deleteCartItems , clearCartItems, updateCartItems} = useContext(CartContext);
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  async function getItems(){
    let {data} = await getCartItems()
    setCart(data)
    setLoading(false)

  }

  async function deleteItem(id){
    setLoading(true)
    let {data} = await deleteCartItems(id)
    setCart(data)
    setLoading(false)

  }
  async function clearItems(){
    setLoading(true)
    let {data} = await clearCartItems()
    if(data.status == 'success'){
      toast.error(data.message,{
        duration:5000
      })
    }
    setCart(data)
    setLoading(false)

  }
 
  async function updateItem(id ,count){
    if (count < 1) {
      setLoading(true)
      let {data} = await deleteCartItems(id)
      setCart(data)
      setLoading(false)
    }else{
      let {data} = await updateCartItems(id,count)
      setCart(data)
    }
    
  }
  useEffect(()=>{
    getItems()
  },[])

  return <>
  <div className="bg-main-light p-2 mt-5 position-relative">
   <h1>Shop Cart:</h1>
   <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
    {loading? <div className='loading'>
    <BallTriangle
         height={100}
         width={100}
         radius={5}

         ariaLabel='ball-triangle-loading'
         wrapperStyle={{}}
         wrapperClass="d-flex justify-content-center mt-5"
         visible={true}
      />
    </div>:cart? <>
    
    <p className='text-main'>Number of Items : {cart?.numOfCartItems}</p>
    <p className='text-main'>Total Price : {cart?.data?.totalCartPrice} EGP</p>
    <button onClick={()=> clearItems()} className='btn btn-danger position-clear'>Clear</button>
    <Link to={`/shippingaddress/${cart.data?._id}`}  className='btn text-white bg-main position-pay'>Pay Now</Link>

    {cart?.data?.products.map(product => <div key={product.product.id} className="row align-items-center p-2 border-1 border-bottom  mb-5 mt-4">
      <div className="col-md-1">
        <div className="img">
          <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
        </div>
      </div>
      <div className="col-md-10">
        <div className="item">
          <h3 className='h5 fw-bold'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
          <p className='text-main fw-bold'>Price : {product.price} EGP</p>
          <button onClick={()=> deleteItem(product.product.id)} className='btn'><i className='fas fa-trash-can text-danger'></i> Remove</button>
        </div>
      </div>
      <div className="col-md-1">
        <div className="count">
          <button onClick={()=>updateItem(product.product.id,product.count+1)} className='rounded-2 brdr p-1'>+</button>
          <span className="mx-2">{product.count}</span>
          <button onClick={()=>updateItem(product.product.id,product.count-1)} className='rounded-2 brdr p-1'>-</button>
        </div>
      </div>
    </div>)}
    </>:<h2>Your cart is empty....</h2>
    }
  </div>
   
  </>
}
