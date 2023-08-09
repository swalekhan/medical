import { configureStore } from "@reduxjs/toolkit";
import busesReducer from '../components/Buses/BusesSlice'

const store = configureStore({
    reducer:{
     buses:busesReducer,
    }
})

export default store