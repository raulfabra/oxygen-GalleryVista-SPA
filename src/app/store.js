import { configureStore } from '@reduxjs/toolkit'
import { PhotosSlice } from '../endpoints/photos/photosSlice'
import { PhotosLikedSlice } from '../endpoints/favourites/photosLikedSlice'

export const reduxStore = configureStore({
  reducer: {
    photos: PhotosSlice.reducer,
    photosLiked: PhotosLikedSlice.reducer
  }
})
