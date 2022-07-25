import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeCategory: 0,
    sortProperties: {
        activeProp: 0,
        sortProp: 'rating',
        sortMath: true
    },
    currentPage: 1,
    searchBy: '',
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload;
            state.currentPage = 1;
        },
        setSortProperty: (state, action) => {
            state.sortProperties = action.payload;
        },
        setSortMath: (state) => {
            state.sortProperties.sortMath = !state.sortProperties.sortMath;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action) => {
            state.activeCategory = +action.payload.activeCateg;
            state.sortProperties = action.payload.sortProperty;
            state.currentPage = +action.payload.curPage;
            console.log(state.activeCategory)
        },
        setSearchBy: (state, action) => {
          state.searchBy = action.payload;
        },
    },
})

export const getFilterData = (state) => {
    return state.filterReducer;
}

export const { setActiveCategory, setSortProperty, setSortMath, setCurrentPage, setFilters, setSearchBy } = filterSlice.actions

export default filterSlice.reducer