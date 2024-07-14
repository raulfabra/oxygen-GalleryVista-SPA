import { createSlice } from '@reduxjs/toolkit'
import { getPhotosRandomThunk } from './photosRandomThunk'

export const PhotosRandomSlice = createSlice({
  name: 'photosRandom',
  initialState: {
    status: 'idle',
    data: [],
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getPhotosRandomThunk.pending, (state, action) => {
      state.status = 'pending'
    }).addCase(getPhotosRandomThunk.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.data = action.payload
    }).addCase(getPhotosRandomThunk.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error
    })
  }
})
