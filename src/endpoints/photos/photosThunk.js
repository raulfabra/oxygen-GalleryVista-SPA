import { createAsyncThunk } from '@reduxjs/toolkit'

export const getPhotosListThunk = createAsyncThunk('photos/getPhotosList', async () => {
  try {
    const request = await fetch('https://api.unsplash.com/photos',
      {
        method: 'GET',
        headers: {
          Authorization: '3tjZqeL38g5AeTWKEZGupusPr_naWKX2bwgawyLE1UI',
          'Content-Type': 'application/json'
        }
      }
    )
    if (request.ok) {
      const jsonData = await request.json()
      console.log(jsonData)
    }
  } catch (error) {
    console.log(error)
    return error
  }
})
