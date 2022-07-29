import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export type Items = {
    id: string,
    imageUrl: string,
    title: string,
    types: string,
    sizes: number,
    price: number,
    count: number,
}

interface FilterSliceState {
    totalCount: number,
    totalPrice: number,
    items: Items[],
}

const initialState: FilterSliceState = {
    totalCount: 0,
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizza: (state, action: PayloadAction<Items>) => {
            const searchItem = state.items.find(obj => obj.id === action.payload.id)
            if(searchItem){
                searchItem.count += 1
            } else{
                state.items.push(action.payload)
            }
            state.totalCount += 1
            state.totalPrice += action.payload.price
        },
        addPizzaInCart: (state, action: PayloadAction<{id: string, price: number,}>) => {
            const searchItem = state.items.find(obj => obj.id === action.payload.id)
            if(searchItem){
                searchItem.count += 1
            }
            state.totalCount += 1
            state.totalPrice += action.payload.price
        },
        clearPizzas: (state, action: PayloadAction<{id: string}>) => {
            const searchItem = state.items.find(obj => obj.id === action.payload.id)
            if(searchItem){
                state.totalCount -= searchItem.count
                state.totalPrice -= (searchItem.price * searchItem.count)
                state.items = state.items.filter(obj => obj.id !== action.payload.id)
            }
        },
        minusPizza: (state, action: PayloadAction<{id: string, price: number,}>) => {
            const searchItem = state.items.find(obj => obj.id === action.payload.id)
            if(searchItem){
                searchItem.count -= 1
                if(searchItem.count === 0){
                    state.items = state.items.filter(obj => obj.id !== action.payload.id)
                }
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

export const getCartData = (state: RootState) => {
    return state.cartReducer;
}
export const getItemCount = (id: string) => (state: RootState) => {
    return state.cartReducer.items.find((obj) => (+obj.id === +id));
}

export const { addPizza, clearPizzas, minusPizza, allClear, addPizzaInCart } = cartSlice.actions

export default cartSlice.reducer