import { createAsyncThunk } from '@reduxjs/toolkit'

export const getPhotosListThunk = createAsyncThunk('photos/getPhotosList', async () => {
  try {
    const request = await fetch('https://api.unsplash.com/photos/',
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
      console.log(jsonData)
      return jsonData.map((data) => ({ id: data.id, image: data.urls.regular }))
    }
  } catch (error) {
    console.log(error)
    return error
  }
})
