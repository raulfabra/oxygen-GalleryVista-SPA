import { Link } from 'react-router-dom'

function App () {
  return (
    <div className='main__page'>
      <div className='main__page--container'>
        <h1 className='main__page--title'>Gallery Vista</h1>
        <Link className='main__page--button' to='/home'>Enter</Link>
      </div>
    </div>
  )
}

export default App
