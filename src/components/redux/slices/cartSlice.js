import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalCount: 0,
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizza: (state, action) => {
            const searchItem = state.items.find(obj => obj.id === action.payload.id)
            if(searchItem){
                searchItem.count += 1
            } else{
                state.items.push(action.payload)
            }
            state.totalCount += 1
            state.totalPrice += action.payload.price
        },
        clearPizzas: (state, action) => {
            const searchItem = state.items.find(obj => obj.id === action.payload.id)
            state.totalCount -= searchItem.count
            state.totalPrice -= (searchItem.price * searchItem.count)
            state.items = state.items.filter(obj => obj.id !== action.payload.id)
        },
        minusPizza: (state, action) => {
            const searchItem = state.items.find(obj => obj.id === action.payload.id)
            searchItem.count -= 1
            if(searchItem.count === 0){
                state.items = state.items.filter(obj => obj.id !== action.payload.id)
            }
            state.totalCount -= 1
            state.totalPrice -= action.payload.price
        },
        allClear: (state) => {
            state.items = []
            state.totalCount = 0;
            state.totalPrice = 0;
        },
    },
})

export const { addPizza, clearPizzas, minusPizza, allClear } = cartSlice.actions

export default cartSlice.reducer