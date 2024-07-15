import { createSlice } from '@reduxjs/toolkit'

export const PhotosLikedSlice = createSlice({
  name: 'photosLiked',
  initialState: {
    data: JSON.parse(localStorage.getItem('photosLiked')) || [],
    error: null
  },
  reducers: {
    addImage: (state, action) => {
      state.data.push(action.payload)
      localStorage.setItem('photosLiked', JSON.stringify(state.data))
    },
    removeImage: (state, action) => {
      state.data = state.data.filter((image) => image.id !== action.payload.id)
      localStorage.setItem('photosLiked', JSON.stringify(state.data))
    }
  }
})

export const getPhotosLikedData = (state) => state.photosLiked.data
export const { addImage, removeImage } = PhotosLikedSlice.actions
