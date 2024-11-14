
import {configureStore} from '@reduxjs/toolkit'
import CatReducer from '../app/categoriesSlice'
import ProductReducer from '../app/productsSlice'
import Cartreducer from '../app/cartSlice'
import Searchreducer from '../app/searchSlice'
import Loginreducer from '../app/loginSlice'
import Orderreducer from '../app/orderSlice'
import Userreducer from '../app/userSlice'
export const store=configureStore(
    {
        reducer:{
            cat:CatReducer
            ,
            pro:ProductReducer
            ,
            cart:Cartreducer
            ,search:Searchreducer
            ,log:Loginreducer
            ,order:Orderreducer,
            user:Userreducer

        }
    }
)