import { configureStore } from '@reduxjs/toolkit'
import { PhotosSlice } from '../endpoints/photos/photosSlice'

export const reduxStore = configureStore({
  reducer: {
    photos: PhotosSlice.reducer
  }
})
