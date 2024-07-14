import { createAsyncThunk } from '@reduxjs/toolkit'

export const getPhotosRandomThunk = createAsyncThunk('photosRandom/getPhotosRandom', async (randomPage) => {
  try {
    const request = await fetch(`https://api.unsplash.com/photos?page=${randomPage}`,
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
      return jsonData
    }
  } catch (error) {
    console.log(error)
    return error
  }
})
