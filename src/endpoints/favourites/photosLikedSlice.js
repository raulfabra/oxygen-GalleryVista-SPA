import { createSlice } from '@reduxjs/toolkit'

export const PhotosLikedSlice = createSlice({
  name: 'photosLiked',
  initialState: {
    data: JSON.parse(window.localStorage.getItem('photosLiked')) || [],
    error: null
  },
  reducers: {
    addImage: (state, action) => {
      state.data.push(action.payload)
      window.localStorage.setItem('photosLiked', JSON.stringify(state.data))
    },
    removeImage: (state, action) => {
      state.data = state.data.filter((image) => image.id !== action.payload.id)
      window.localStorage.setItem('photosLiked', JSON.stringify(state.data))
    },
    updateImage: (state, action) => {
      state.data = action.payload
    }
  }
})

export const getPhotosLikedData = (state) => state.photosLiked.data
export const { addImage, removeImage, updateImage } = PhotosLikedSlice.actions
