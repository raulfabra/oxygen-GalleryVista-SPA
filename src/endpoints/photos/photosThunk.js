import { createAsyncThunk } from '@reduxjs/toolkit'

export const getPhotosListThunk = createAsyncThunk('photos/getPhotosList', async (query) => {
  try {
    let URL = `https://api.unsplash.com/search/photos?page=1&query=${query}`
    if (query === undefined || query.length === 0 || query.startsWith(' ')) {
      URL = `https://api.unsplash.com/photos?page=${Math.ceil(Math.random() * 300)}`
    }
    const request = await fetch(URL,
      {
        method: 'GET',
        headers: {
          Authorization: 'Client-ID 3tjZqeL38g5AeTWKEZGupusPr_naWKX2bwgawyLE1UI',
          'Content-Type': 'application/json'
        }
      }
    )
    if (request.ok) {
      const jsonData = await request.json()
      return jsonData.results || jsonData
    }
  } catch (error) {
    return error
  }
})
