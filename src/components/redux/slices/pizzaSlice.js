import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchByPizza',
    async ({ activeCategory, searchBy, sortProperties, currentPage }) => {
        const { data } = await axios.get(`https://62cc4d0ca080052930a9357f.mockapi.io/items?${activeCategory > 0 ? `category=${activeCategory}` : ''}&${searchBy !== undefined ? `title=${searchBy}` : ''}&sortBy=${sortProperties.sortProp}&order=${sortProperties.sortMath === true ? 'desc' : 'asc'}&page=${currentPage}&limit=4`);
        const pageCountReq = (await axios.get(`https://62cc4d0ca080052930a9357f.mockapi.io/items?${activeCategory > 0 ? `category=${activeCategory}` : ''}&${searchBy !== undefined ? `title=${searchBy}` : ''}&sortBy=${sortProperties.sortProp}&order=${sortProperties.sortMath === true ? 'desc' : 'asc'}`)).data.length;
        return { data, pageCountReq };
    }
)

const initialState = {
    items: [],
    isLoading: 'loading',
    pageCount: 3,
}

export const pizzaSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setPizza: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.isLoading = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.isLoading = 'succes';
            state.items = action.payload.data;
            state.pageCount = action.payload.pageCountReq;
        },
        [fetchPizzas.rejected]: (state) => {
            state.isLoading = 'error';
            state.items = [];
        },
    },
})

export const { setPizza } = pizzaSlice.actions

export default pizzaSlice.reducer