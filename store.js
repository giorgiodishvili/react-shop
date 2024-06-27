import { configureStore } from "@reduxjs/toolkit";
import localStoreReducer from './localStore/localStore'

export const store=configureStore({

    reducer:{
        localStoreReducer
    }

})