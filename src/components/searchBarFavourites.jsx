import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPhotosLikedData, updateImage } from '../endpoints/favourites/photosLikedSlice'
import debounce from 'just-debounce-it'

export const SearchBarFavourites = () => {
  const dispatch = useDispatch()

  const [beforeSearchPhotos, setBeforeSearchPhotos] = useState([])
  const photosLikedData = useSelector(getPhotosLikedData)

  const debouncedGetPhotos = useCallback(
    debounce((findPhotosWithThisDescription) => {
      dispatch(updateImage(findPhotosWithThisDescription))
    }, 500)
  )

  const handleChange = (event) => {
    console.log(event.target.value)
    if (event.target.value === '' || null) return debouncedGetPhotos(beforeSearchPhotos)

    const findPhotosWithThisDescription = photosLikedData.filter((photo) => photo.description.includes(event.target.value))
    if (findPhotosWithThisDescription.length > 0) debouncedGetPhotos(findPhotosWithThisDescription)
    else debouncedGetPhotos(beforeSearchPhotos)
  }

  useEffect(() => {
    setBeforeSearchPhotos(photosLikedData)
  }, [])

  return (
    <section className='searchBar'>
      <form className='searchBar__container'>
        <input type='text' name='myphotos' id='myphotos' className='searchBar__container--input' placeholder='Search photos' onChange={handleChange} />
        <img src='./magnifying-glass.png' alt='search__icon' className='searchBar__container--iconGlass' width={25} height={25} />
      </form>
    </section>
  )
}
