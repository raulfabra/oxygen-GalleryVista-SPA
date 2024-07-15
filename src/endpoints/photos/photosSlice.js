import { createSlice } from '@reduxjs/toolkit'
import { getPhotosListThunk } from './photosThunk'

export const PhotosSlice = createSlice({
  name: 'photos',
  initialState: {
    status: 'idle',
    data: [],
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getPhotosListThunk.pending, (state, action) => {
      state.status = 'pending'
    }).addCase(getPhotosListThunk.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.data = action.payload
    }).addCase(getPhotosListThunk.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error
    })
  }
})

export const getPhotosListStatus = (state) => state.photos.status
export const getPhotosListData = (state) => state.photos.data
export const getPhotosListError = (state) => state.photos.error
