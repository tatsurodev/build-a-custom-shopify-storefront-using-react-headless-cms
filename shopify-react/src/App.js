import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <div className='App'>
      <Router>
        <p>Navigation</p>
        <Routes>
          <Route path='/products/:handle' element={<ProductPage />} />
          <Route path='/' element={<Home />} />
        </Routes>
        <p>Footer</p>
      </Router>
    </div>
  )
}

export default App
