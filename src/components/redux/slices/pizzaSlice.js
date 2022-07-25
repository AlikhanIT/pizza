import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchByPizza',
    async ({ activeCategory, searchBy, sortProperties, currentPage }, thunkAPI) => {
        const currencyValue = (await axios.get('http://www.floatrates.com/daily/kzt.json')).data['rub'].inverseRate;
        const { data } = await axios.get(`https://62cc4d0ca080052930a9357f.mockapi.io/items?${activeCategory > 0 ? `category=${activeCategory}` : ''}&${searchBy !== undefined ? `title=${searchBy}` : ''}&sortBy=${sortProperties.sortProp}&order=${sortProperties.sortMath === true ? 'desc' : 'asc'}&page=${currentPage}&limit=4`);
        const pageCountReq = (await axios.get(`https://62cc4d0ca080052930a9357f.mockapi.io/items?${activeCategory > 0 ? `category=${activeCategory}` : ''}&${searchBy !== undefined ? `title=${searchBy}` : ''}&sortBy=${sortProperties.sortProp}&order=${sortProperties.sortMath === true ? 'desc' : 'asc'}`)).data.length;
        if (data.length === 0) {
            return thunkAPI.rejectWithValue('error');
        }
        return { data, pageCountReq, currencyValue };
    }
)

const initialState = {
    items: [],
    isLoading: 'loading',
    pageCount: 3,
    currency: 8,
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
            state.currency = action.payload.currencyValue
        },
        [fetchPizzas.rejected]: (state) => {
            state.isLoading = 'error';
            state.items = [];
        },
    },
})

export const getPizzaData = (state) => {
    return state.pizzaReducer;
}

export const { setPizza } = pizzaSlice.actions

export default pizzaSlice.reducer