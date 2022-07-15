import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeCategory: 0,
    sortProperties: {
        activeProp: 0,
        sortProp: 'rating',
        sortMath: true
    },
    currentPage: 1,
    pageCount: 3,
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
        setPageCount: (state, action) => {
            state.pageCount = action.payload;
        },
        setFilters: (state, action) => {
            state.activeCategory = action.payload.activeCategory;
            state.sortProperties = action.payload.sortProperties;
            state.currentPage = action.payload.currentPage;
        },
    },
})

export const { setActiveCategory, setSortProperty, setSortMath, setCurrentPage, setPageCount, setFilters } = filterSlice.actions

export default filterSlice.reducer