import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {FilterSliceState} from "./filterSlice";

type Item = {
    title: string,
    id: string,
    imageUrl: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number,
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchByPizza',
    async ({ activeCategory, searchBy, sortProperties, currentPage }: FilterSliceState, thunkAPI) => {
        const currencyValue: number = (await axios.get('http://www.floatrates.com/daily/kzt.json')).data['rub'].inverseRate;
        const { data } = await axios.get<Item[]>(`https://62cc4d0ca080052930a9357f.mockapi.io/items?${activeCategory > 0 ? `category=${activeCategory}` : ''}&${searchBy !== undefined ? `title=${searchBy}` : ''}&sortBy=${sortProperties.sortProp}&order=${sortProperties.sortMath === true ? 'desc' : 'asc'}&page=${currentPage}&limit=4`);
        const pageCountReq = (await axios.get<Item[]>(`https://62cc4d0ca080052930a9357f.mockapi.io/items?${activeCategory > 0 ? `category=${activeCategory}` : ''}&${searchBy !== undefined ? `title=${searchBy}` : ''}&sortBy=${sortProperties.sortProp}&order=${sortProperties.sortMath === true ? 'desc' : 'asc'}`)).data.length;
        if (data.length === 0) {
            return thunkAPI.rejectWithValue('error');
        }
        return { data, pageCountReq, currencyValue };
    }
)

export enum LoadingStatus {
    LOADING = 'loading',
    ERROR = 'error',
    SUCCESS = 'success'
}

interface PizzaSliceState {
    items: Item[],
    isLoading: LoadingStatus.LOADING | LoadingStatus.SUCCESS | LoadingStatus.ERROR,
    pageCount: number,
    currency: number,
}

const initialState: PizzaSliceState = {
    items: [],
    isLoading: LoadingStatus.LOADING,
    pageCount: 3,
    currency: 8,
}

export const pizzaSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setPizza: (state, action: PayloadAction<Item>) => {
            state.items.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.isLoading = LoadingStatus.LOADING;
            state.items = [];
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.isLoading = LoadingStatus.SUCCESS;
            state.items = action.payload.data;
            state.pageCount = action.payload.pageCountReq;
            state.currency = action.payload.currencyValue;
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.isLoading = LoadingStatus.ERROR;
            state.items = [];
        })
    },
})

export const getPizzaData = (state: RootState) => {
    return state.pizzaReducer;
}

export const { setPizza } = pizzaSlice.actions

export default pizzaSlice.reducer