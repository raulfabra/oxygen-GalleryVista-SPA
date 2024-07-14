import { configureStore } from '@reduxjs/toolkit'

export const reduxStore = configureStore({
    reducer: {
        photos: PhotosSlice.reducer
    }
})
