import React, { useContext, useEffect, useState }  from 'react';
import styles from './Wishlist.module.css';
import { WishlistContext } from '../../Context/WishlistContext.js';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext.js';
import toast from 'react-hot-toast'


export default function Wishlist() {
  let {getWishlistItems , deleteWishlistItems } = useContext(WishlistContext);
  let {addToCart} = useContext(CartContext)
  const [wishlist, setWishlist] = useState(null)
  const [loading, setLoading] = useState(true)
  async function postToCart(id){
    let {data} = await addToCart(id);
    if(data.status == 'success'){
      toast.success(data.message,{
        duration:5000
      })
    }

  }
  async function getItems(){
    let {data} = await getWishlistItems()
    setWishlist(data)
    setLoading(false)

  }
  async function deleteItem(id){
    setLoading(true)
    let {data} = await deleteWishlistItems(id)
    setWishlist(data)
    getItems()
    setLoading(false)

  }

  useEffect(()=>{
    getItems()
  },[])

  return <>
  <div className="bg-main-light p-2 mt-5 position-relative">
   <h1>My Wishlist:</h1>
   <Helmet>
        <meta charSet="utf-8" />
        <title>Wishlist</title>
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
    </div>:wishlist? <>
    
    {wishlist?.data.map(product => <div key={product._id} className="row align-items-center p-2 border-1 border-bottom  mb-5 mt-4">
      <div className="col-md-2">
        <div className="img">
          <img src={product.imageCover} className='w-100' alt={product.title} />
        </div>
      </div>
      <div className="col-md-8">
        <div className="item">
          <h3 className='h5 fw-bold'>{product.title?.split(' ').slice(0,3).join(' ')}</h3>
          <p className='text-main fw-bold'>{product.price} EGP</p>
          <button onClick={()=> deleteItem(product._id)} className='btn'><i className='fas fa-trash-can text-danger'></i> Remove</button>
        </div>
      </div>
      <div className="col-md-2">
      <button onClick={()=>postToCart(product._id)} className='btn bg-main text-white w-75 mx-auto btn-sm'><i class="fa-solid fa-plus"></i> Add to cart</button>
      </div>
      
    </div>)}
    </>:<h2>Your wishlist is empty....</h2>
    }
  </div>
   
  </>
}
