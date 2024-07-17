import { createSlice } from '@reduxjs/toolkit'

export const PhotosLikedSlice = createSlice({
  name: 'photosLiked',
  initialState: {
    status: 'idle',
    data: JSON.parse(window.localStorage.getItem('photosLiked')) || [],
    error: null
  },
  reducers: {
    addImage: (state, action) => {
      state.status = 'adding'
      state.data.push(action.payload)
      window.localStorage.setItem('photosLiked', JSON.stringify(state.data))
    },
    removeImage: (state, action) => {
      state.status = 'removing'
      state.data = state.data.filter((image) => image.id !== action.payload.id)
      window.localStorage.setItem('photosLiked', JSON.stringify(state.data))
    },
    orderByWidth: (state, action) => {
      state.status = 'orderByWidth'
      if (state.data.length <= 0) state.data = JSON.parse(window.localStorage.getItem('photosLiked'))
      state.data = state.data.filter((image) => image.width >= action.payload)
      state.data = state.data.sort((a, b) => b.width - a.width)
      console.log('despues de ordenar por W', state.data)
    },
    orderByHeight: (state, action) => {
      state.status = 'orderByHeight'
      if (state.data.length <= 0) state.data = JSON.parse(window.localStorage.getItem('photosLiked'))
      state.data = state.data.filter((image) => image.height >= action.payload)
      state.data = state.data.sort((a, b) => b.height - a.height)
      console.log('despues de ordenar por H', state.data)
    },
    orderByLike: (state, action) => {
      state.status = 'orderByLikes'
      if (state.data.length <= 0) state.data = JSON.parse(window.localStorage.getItem('photosLiked'))
      state.data = state.data.filter((image) => image.likes >= action.payload)
      state.data = state.data.sort((a, b) => b.likes - a.likes)
      console.log('despues de ordenar por L', state.data)
    }
  }
})

export const getPhotosLikedStatus = (state) => state.photosLiked.status
export const getPhotosLikedData = (state) => state.photosLiked.data
export const { addImage, removeImage, orderByWidth, orderByHeight, orderByLike } = PhotosLikedSlice.actions
