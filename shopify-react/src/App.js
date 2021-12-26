import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cart from './components/Cart'
import NavBar from './components/NavBar'
import NavMenu from './components/NavMenu'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Cart />
        <NavMenu />
        <Routes>
          <Route path='/products/:handle' element={<ProductPage />} />
          <Route path='/' element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
