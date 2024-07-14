import debounce from 'just-debounce-it'
import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPhotosListThunk } from '../endpoints/photos/photosThunk'
import { getPhotosRandomThunk } from '../endpoints/photosRandom/photosRandomThunk'

function HomePage () {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const photosListData = useSelector((state) => state.photos.data)
  const photosRandomData = useSelector((state) => state.photosRandom.data)

  const debouncedGetPhotos = useCallback(
    debounce(query => {
      dispatch(getPhotosListThunk(query))
    }, 1000)
  )
  const debounceRandomPhotos = useCallback(
    debounce(() => {
      setLoading(false)
      const randomPage = Math.ceil(Math.random() * 300)
      dispatch(getPhotosRandomThunk(randomPage))
    }, 1000)
  )
  const handleSearch = (event) => {
    const query = event.target.value
    if (query.length === 0 || query.startsWith(' ')) {
      debounceRandomPhotos()
    } else debouncedGetPhotos(query)
  }

  useEffect(() => {
    debounceRandomPhotos()
  }, [])

  return (
    <>
      <header className='navBar'>
        <div>
          <img src='public\Group 1.png' alt='icon__title' className='navBar--title' />
        </div>
        <Link to='/favorites' className='navBar--favorites'><img src='public\Group 2.png' alt='icon_favourite' /></Link>
      </header>
      <article className='title__homePage'>
        <div>
          <img src='public\Group 1_desktop.png' alt='title__homepage' />
        </div>
      </article>
      <section className='searchBar'>
        <div className='searchBar__container'>
          <input type='text' name='booking' id='booking' className='searchBar__container--input' placeholder='Search photos' onChange={handleSearch} />
          <img src='public\magnifying-glass.png' alt='search__icon' className='searchBar__container--iconGlass' width={25} height={25} />
        </div>
      </section>
      {loading && <div className='spinner' />}
      <section className='photos--gallery'>
        {!loading && photosListData?.map((photo) => (
          <div key={photo.id} className='photos--container'>
            <img src={photo.urls.regular} className='photos--img' alt={photo.alt_description} />
            <img src='src\assets\icon.svg' alt='icon__like' className='photos--like' />
          </div>
        ))}
        {!loading && photosRandomData?.map((photo) => (
          <div key={photo.id} className='photos--container'>
            <img src={photo.urls.regular} className='photos--img' alt={photo.alt_description} />
            <img src='src\assets\icon.svg' alt='icon__like' className='photos--like' />
          </div>
        ))}
      </section>
    </>
  )
}

export default HomePage
