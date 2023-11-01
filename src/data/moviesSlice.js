import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const FETCH_STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
};

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
    const response = await fetch(apiUrl)
    return response.json()
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        moviesList: [],
        fetchStatus: FETCH_STATUS.IDLE,
        totalPages: 0,
    },
    reducers: {
        clearMovies: (state) => {
            state.moviesList = [];
            state.fetchStatus = FETCH_STATUS.IDLE;
            state.totalPages = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.moviesList = [...state.moviesList, ...action.payload.results];
            state.totalPages = action.payload.total_pages; 
            state.fetchStatus = FETCH_STATUS.SUCCESS;
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = FETCH_STATUS.LOADING;
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = FETCH_STATUS.ERROR;
        })
    }
})

export default moviesSlice

