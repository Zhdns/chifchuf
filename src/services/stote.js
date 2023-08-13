import { createSlice } from '@reduxjs/toolkit'

export const or = createSlice({
    name: 'or',
    initialState: {
        submit: false,
        orders: [],
        returns: [],
        date: '',
        orderRange: 8,
        returnRage: 80,
    },
    reducers: {
        addOrders: (state, action) => {
            console.log(action.payload)
            state.orders = action.payload.orders
            console.log(state.orders)
        },
        addReturns: (state, action) => {
            console.log(action.payload)
            state.returns = action.payload.returns
            console.log(state.returns)
        },
        addDate: (state, action) => {
            state.date = action.payload.date
            console.log(state.date)
        },
        isSubmit: (state, action) => { 
            state.submit = true
        },
        addOrderRange: (state, action) => {
            state.orderRange = action.payload
        },
        addReturnRange: (state, action) => {
            state.returnRage = action.payload
        }
    }
})

export const {addOrders, addReturns, addDate, isSubmit, addOrderRange, addReturnRange} = or.actions

export default or