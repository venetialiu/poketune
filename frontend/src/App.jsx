import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext'
import './App.css'

import About from './components/About/About'
import Auth from './components/Auth/Auth'
import Show from './components/Show/Show'


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // TBD:
  // Rehydrate user from localStorage so Google login persists across reloads
  //  Rehydrate JWT
  

  return (
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading }}>
        <Router>
          <Routes>
            {/* auth (login) is the first page users land on */}
            <Route path="/" element={<div className="App"><Auth /></div>} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="/about" element={<About />} />
            <Route path="/show" element={<Show />} />
            {/* to add: unique meeting page routes to ID */}
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  )
}

export default App
