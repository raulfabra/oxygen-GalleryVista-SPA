import debounce from 'just-debounce-it'
import { useDispatch } from 'react-redux'
import { getPhotosListThunk } from '../endpoints/photos/photosThunk'
import { useCallback } from 'react'

export const SearchBar = () => {
  const dispatch = useDispatch()

  const debouncedGetPhotos = useCallback(
    debounce(query => {
      dispatch(getPhotosListThunk(query))
    }, 1000)
  )

  const handleSearch = (event) => {
    const query = event.target.value
    debouncedGetPhotos(query)
  }

  return (
    <section className='searchBar'>
      <div className='searchBar__container'>
        <input type='text' name='booking' id='booking' className='searchBar__container--input' placeholder='Search photos' onChange={handleSearch} />
        <img src='public\magnifying-glass.png' alt='search__icon' className='searchBar__container--iconGlass' width={25} height={25} />
      </div>
    </section>
  )
}
