import { useState, useEffect } from "react"
import Login from "./components/Login"
import ItemList from "./components/ItemList"
import Navbar from "./components/Navbar"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  // 🔥 THIS LINE FORCES FULL RE-RENDER WHEN LOGIN STATE CHANGES
  const appKey = isLoggedIn ? "logged-in" : "logged-out"

  return (
    <div key={appKey}>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <>
          <Navbar setIsLoggedIn={setIsLoggedIn} />
          <ItemList />
        </>
      )}
    </div>
  )
}

export default App
