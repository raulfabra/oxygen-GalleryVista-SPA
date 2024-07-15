import debounce from 'just-debounce-it'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPhotosListThunk } from '../endpoints/photos/photosThunk'
import { getPhotosListData, getPhotosListError, getPhotosListStatus } from '../endpoints/photos/photosSlice'
import { Header } from '../components/_header'
import { Title } from '../components/_title'
import { SearchBar } from '../components/searchBar'
import { Spinner } from '../components/spinner'
import { useLocation } from 'react-router-dom'

function HomePage () {
  const dispatch = useDispatch()
  const location = useLocation()

  const [loading, setLoading] = useState(true)
  const [photoListShow, setPhotoListShow] = useState([])

  const photosListData = useSelector(getPhotosListData)
  const photosListStatus = useSelector(getPhotosListStatus)
  const photosListError = useSelector(getPhotosListError)

  const debouncedGetPhotos = useCallback(
    debounce(query => {
      setLoading(false)
      dispatch(getPhotosListThunk(query))
    }, 1000)
  )

  useEffect(() => {
    if (photosListStatus === 'idle') debouncedGetPhotos()
    else if (photosListStatus === 'rejected') console.log(photosListError)
    else if (photosListStatus === 'fulfilled') {
      setLoading(false)
      setPhotoListShow(photosListData)
    }
  }, [photosListStatus])

  return (
    <>
      <Header />
      <Title location={location.pathname} />
      <SearchBar />
      {loading && <Spinner />}
      <section className='photos--gallery'>
        {!loading && photoListShow.map((photo) => (
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
