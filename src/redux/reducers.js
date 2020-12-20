import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    questions:[], 
    lastGames:[],
    items:[],
    loading: false,
    failed:false,
    err:null,

}

const test = createSlice({
    name: 'test',
    initialState,
    reducers: {
        testFetching: (state) => {
                state.loading = true
        },
        testFetched: (state, action) => {
                state.loading = false,
                state.items = action.payload.results
        },
        testFetchingError: (state, action) => {
                state.failed = true,
                state.err = action.payload.err
        }
    }
})

const { actions, reducer } = test;

export const {
    testFetched, testFetching, testFetchingError
} = actions;
export default reducer
