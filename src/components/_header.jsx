import { Link } from 'react-router-dom'

export const Header = ({ location }) => {
  return (
    <header className='navBar'>
      <div>
        <img src='./Group 1.png' alt='icon__title' className='navBar--title' />
      </div>
      {location !== '/favorites'
        ? <Link to='/favorites' className='navBar--favorites'><img src='./Group 2.png' alt='icon_favourite' /></Link>
        : <Link to='/home' className='navBar--favorites'><img src='./Group2_home.png' alt='icon_home' /></Link>}
    </header>
  )
}
