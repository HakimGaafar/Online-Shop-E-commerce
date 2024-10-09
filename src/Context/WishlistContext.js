import axios from "axios";
import { createContext } from "react";

export let WishlistContext = createContext()
export default function WishlistContextProvider(props){

    let headers ={
        token: localStorage.getItem('userToken')
    }
    function addToWishlist(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            productId
        },{
            headers
        })
        .then((response)=>response)
        .catch((err)=>err)

    }
    function getWishlistItems(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            headers
        })
        .then((response)=>response)
        .catch((err)=>err)

    }
    function deleteWishlistItems(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
            headers
        })
        .then((response)=>response)
        .catch((err)=>err)

    }

   

    return <WishlistContext.Provider value={{addToWishlist,getWishlistItems, deleteWishlistItems  }}>
        {props.children}
    </WishlistContext.Provider>


}