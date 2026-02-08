import axios from "axios"
import { useEffect,useState } from "react"
import { PlusCircle } from "lucide-react"

export default function ItemList(){
  const [items,setItems]=useState([])
  const token = localStorage.getItem("token")

  useEffect(()=>{
    axios.get("http://localhost:5000/items")
    .then(response => setItems(response.data))
  },[])

  const addItem = async (id)=>{
    await axios.post(
      "http://localhost:5000/carts",
      { itemId:id },
      { headers:{ Authorization:token } }
    )
    window.alert("Added to cart")
  }

  return(
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-10">

      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
        Browse Products
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {items.map(item => (
          <div
            key={item._id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:scale-105"
          >

            {/* PRODUCT IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="h-56 w-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.name}
              </h3>

              <p className="text-2xl font-extrabold text-blue-600 mb-4">
                ₹ {item.price}
              </p>

              <button
                onClick={()=>addItem(item._id)}
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                <PlusCircle size={18}/> Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
