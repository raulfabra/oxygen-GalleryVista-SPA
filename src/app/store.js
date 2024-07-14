import { configureStore } from '@reduxjs/toolkit'
import { PhotosSlice } from '../endpoints/photos/photosSlice'
import { PhotosRandomSlice } from '../endpoints/photosRandom/photosRandomSlice'

export const reduxStore = configureStore({
  reducer: {
    photos: PhotosSlice.reducer,
    photosRandom: PhotosRandomSlice.reducer
  }
})
