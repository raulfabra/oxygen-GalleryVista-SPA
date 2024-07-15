import { useLocation } from 'react-router-dom'
import { Header } from '../components/_header'
import { Title } from '../components/_title'
import { SearchBarFavourites } from '../components/searchBarFavourites'
import { useSelector } from 'react-redux'
import { getPhotosLikedData } from '../endpoints/favourites/photosLikedSlice'

function MyFavorites () {
  const location = useLocation()
  const savedPhotos = useSelector(getPhotosLikedData)
  console.log(savedPhotos[0])
  return (
    <>
      <Header location={location.pathname} />
      <Title location={location.pathname} />
      <SearchBarFavourites />
      <section className='photos--gallery'>
        {savedPhotos.map((photo) => (
          <div key={photo.id} className='photos--container'>
            <img src={photo.url} className='photos--img' alt={photo.description} datatype={photo.id} />
            {/* <img src='src\assets\icon.svg' alt='icon__like' className='photos--like' /> */}
          </div>
        ))}
      </section>
    </>
  )
}

export default MyFavorites
