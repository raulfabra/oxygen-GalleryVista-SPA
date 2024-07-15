import { useLocation } from 'react-router-dom'
import { Header } from '../components/_header'
import { Title } from '../components/_title'
import { SearchBarFavourites } from '../components/searchBarFavourites'

function MyFavorites () {
  const location = useLocation()

  return (
    <>
      <Header location={location.pathname} />
      <Title location={location.pathname} />
      <SearchBarFavourites />
    </>
  )
}

export default MyFavorites
