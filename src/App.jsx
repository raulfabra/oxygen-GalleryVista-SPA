import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPhotosListThunk } from './endpoints/photos/photosThunk'
import debounce from 'just-debounce-it'

function App () {
  const dispatch = useDispatch()
  const photosListData = useSelector((state) => state.photos.data)

  const debouncedGetPhotos = useCallback(
    debounce(query => {
      console.log('query: ', query)
      dispatch(getPhotosListThunk(query))
    }, 1000)
  )
  const handleSearch = (event) => {
    const query = event.target.value
    console.log(query)

    debouncedGetPhotos(query)
  }

  return (
    <>
      <header className='navBar'>
        <div>
          <img src='public\Group 1.png' alt='icon__title' className='navBar--title' />
        </div>
        <img src='public\menu.png' alt='icon_menu' width={40} height={40} className='navBar--menu' />
        <img src='public\Group 2.png' alt='icon_favourite' className='navBar--favorites' />
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
      <section className='photos--gallery'>
        {photosListData.length > 0 && photosListData.map((photo) => (
          <div key={photo.id} className='photos--container'>
            <img src={photo.urls.regular} className='photos--img' alt={photo.alt_description} />
            <img src='src\assets\icon.svg' alt='icon__like' className='photos--like' />
          </div>
        ))}
      </section>
    </>
  )
}

export default App
