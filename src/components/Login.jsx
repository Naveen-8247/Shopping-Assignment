import { useState } from "react"
import axios from "axios"
import { UserPlus, LogIn, User, Lock } from "lucide-react"

export default function Login({ setIsLoggedIn }) {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [isSignupMode,setIsSignupMode] = useState(true)

  const handleSubmit = async () => {
    if(!username || !password){
      window.alert("Please enter username & password")
      return
    }

    try {
      // SIGNUP 
      if(isSignupMode){
        await axios.post("http://localhost:5000/users",{username,password})
        window.alert("Account created! Please login.")
        setIsSignupMode(false)
        return
      }

      // LOGIN 
      const response = await axios.post(
        "http://localhost:5000/users/login",
        {username,password}
      )

      localStorage.setItem("token",response.data.token)
      setIsLoggedIn(true)

    } catch(error){
      if(error.response?.status === 403)
        window.alert("You cannot login on another device.")
      else
        window.alert("Invalid username/password")
    }
  }

  return(
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">

      {/* Glass Card */}
      <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-96">

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800 flex items-center justify-center gap-2">
          {isSignupMode ? <UserPlus size={28}/> : <LogIn size={28}/>}
          {isSignupMode ? "Create Account" : "Welcome Back"}
        </h1>

        {/* Username */}
        <div className="relative mb-5">
          <User className="absolute left-3 top-3 text-gray-400" size={18}/>
          <input
            className="pl-10 border p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username"
            value={username}
            onChange={(event)=>setUsername(event.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative mb-7">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18}/>
          <input
            type="password"
            className="pl-10 border p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl font-bold text-lg hover:scale-105 transition transform shadow-lg">
          {isSignupMode ? "Sign Up" : "Login"}
        </button>

        {/* Toggle */}
        <p
          onClick={()=>setIsSignupMode(!isSignupMode)}
          className="text-center mt-6 text-blue-600 cursor-pointer font-semibold hover:underline">
          {isSignupMode
            ? "Already have an account? Login"
            : "New here? Create account"}
        </p>

      </div>
    </div>
  )
}
