import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


// importing styling
import '../styles/navbar.scss'
function NavBar() {

  const [state, setState] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetch('/api/isLoggedIn', { method: 'post' }).then(textResponse => textResponse.json()).then(obj => { setIsLoggedIn(obj.isLoggedIn); console.log(obj) })
  }, [state])

  function tmenu() {
    setState(!state)
  }

  //close menu on page load 
  const links = document.querySelectorAll('a')
  for (let listItem of links) {
    listItem.onclick = () => {
      setState(false)

    }
  }
  useEffect(() => {
    const menu = document.querySelector('.menus')
    if (state) {
      menu.classList.add('menu-open')
    }
    else {
      menu.classList.remove('menu-open')
    }
  }, [state])

  // log out functionality

  async function logout() {
    const res = await fetch('/api/logout', { method: 'post' })
    const { status } = res.json();

    if (status === 'destroyed') setIsLoggedIn(false)

  }

  return (
    <header>
      <div className='header'>
        <Link to={"/"}>
          <img src="/logo.webp" alt="spots" />
        </Link>
        <nav className="menus menu-open">
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/all-places'><li>All places</li> </Link>
          <Link to='/users'> <li>Users</li></Link>
          {isLoggedIn ?
            (<>
              <li className='a' onClick={() => logout()}> Logout</li>
              <Link to='/profile'> <li className='login-button'>Proifle</li></Link>
            </>
            )
            :
            <Link to='/login'> <li className='login-button'>Login</li></Link>
          }
        </nav>
        <span onClick={() => tmenu()}><i className="fa fa-align-right" ></i></span>
      </div>
    </header>
  )
}

export default NavBar;