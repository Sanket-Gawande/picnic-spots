import Home from './Home'
import './styles/root.scss'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from "./partials/NavBar";
import Footer from "./partials/Footer";
import Users from './Users'
import UserProfile from './UserProfile'
import Places from './Places'
import Login from './Login'
import Signup from './Signup'
import UserPlaces from './UserPlaces'
const App = () => {
  return (
    <>
      <div style={{ width : "100vw"}}>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/users' exact element={< Users />} />
            <Route path='/profile' exact element={< UserProfile />} />
            <Route path='/all-places' exact element={< Places />} />
            <Route path='/places/:userid' exact element={< UserPlaces />} />
            <Route path='/login' exact element={< Login />} />
            <Route path='/signup' exact element={< Signup />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  )
}

export default App
