import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export type TypeOfSort = {
    sortName?: string,
    activeProp: number,
    sortProp: string,
    sortMath: boolean,
}

export type TypeOfNavigate = {
    activeCateg: string,
    curPage: string,
    sortProperty: TypeOfSort,
}

export interface FilterSliceState {
    activeCategory: number,
    sortProperties: TypeOfSort,
    currentPage: number,
    searchBy: string,
}

const initialState: FilterSliceState = {
    activeCategory: 0,
    sortProperties: {
        activeProp: 0,
        sortProp: 'rating',
        sortMath: true,
    },
    currentPage: 1,
    searchBy: '',
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActiveCategory: (state, action: PayloadAction<number>) => {
            state.activeCategory = action.payload;
            state.currentPage = 1;
        },
        setSortProperty: (state, action: PayloadAction<TypeOfSort>) => {
            state.sortProperties = action.payload;
        },
        setSortMath: (state) => {
            state.sortProperties.sortMath = !state.sortProperties.sortMath;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action: PayloadAction<TypeOfNavigate>) => {
            state.activeCategory = +action.payload.activeCateg;
            state.sortProperties = action.payload.sortProperty;
            state.currentPage = +action.payload.curPage;
        },
        setSearchBy: (state, action: PayloadAction<string>) => {
          state.searchBy = action.payload;
        },
    },
})

export const getFilterData = (state: RootState) => {
    return state.filterReducer;
}

export const { setActiveCategory, setSortProperty, setSortMath, setCurrentPage, setFilters, setSearchBy } = filterSlice.actions

export default filterSlice.reducer