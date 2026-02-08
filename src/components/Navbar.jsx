import axios from "axios"
import { ShoppingCart, Package, LogOut, CreditCard } from "lucide-react"

export default function Navbar({ setIsLoggedIn }) {

  // LOGOUT (works even if backend fails)
  const logoutUser = async () => {
    const token = localStorage.getItem("token")

    try {
      await axios.post(
        "http://localhost:5000/users/logout",
        {},
        { headers: { Authorization: token } }
      )
    } catch (err) {
      console.log("Backend logout failed — logging out locally")
    }

    // 🔥 force logout + navigate to login page
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  }

  const showCart = async () => {
    const token = localStorage.getItem("token")
    const res = await axios.get(
      "http://localhost:5000/carts",
      { headers: { Authorization: token } }
    )
    window.alert(JSON.stringify(res.data, null, 2))
  }

  const showOrders = async () => {
    const token = localStorage.getItem("token")
    const res = await axios.get(
      "http://localhost:5000/orders",
      { headers: { Authorization: token } }
    )
    window.alert(JSON.stringify(res.data, null, 2))
  }

  const checkout = async () => {
    const token = localStorage.getItem("token")
    await axios.post(
      "http://localhost:5000/orders",
      {},
      { headers: { Authorization: token } }
    )
    window.alert("🎉 Order placed successfully!")
  }

  return (
    <div className="backdrop-blur-md bg-white/70 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <h1 className="flex items-center gap-2 text-2xl font-extrabold 
          bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <ShoppingCart size={28} />
          ShopEasy
        </h1>

        {/* Buttons */}
        <div className="flex gap-4">

          <button
            onClick={showCart}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-white font-semibold shadow">
            <ShoppingCart size={18}/> Cart
          </button>

          <button
            onClick={checkout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow">
            <CreditCard size={18}/> Checkout
          </button>

          <button
            onClick={showOrders}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow">
            <Package size={18}/> Orders
          </button>

          <button
            onClick={logoutUser}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow">
            <LogOut size={18}/> Logout
          </button>

        </div>
      </div>
    </div>
  )
}
