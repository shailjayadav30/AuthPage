import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { handleerror, handlesuccess } from "../utils"
import { ToastContainer } from "react-toastify"
const Home = () => {
const [loggedinuser,setloggedinuser]=useState("")
const [products,setproducts]=useState("")

  const navigate=useNavigate()
  useEffect(()=>{
    setloggedinuser(localStorage.getItem("loggedinuser"))
  },[])
  const handlelogout=()=>{
localStorage.removeItem("token")
localStorage.removeItem("loggedinuser")
handlesuccess("user loggedout")
setTimeout(() => {
  navigate("/login")
}, 1000);
  }
  const fetchproducts=   async()=>{
   try {
      const url='https://auth-page-api.vercel.app/products'
      const headers={
        headers:{
        "Authorization":localStorage.getItem("token")
        }
      }
      const response=await fetch(url,headers)
      const result=await response.json()
      console.log(result);
      setproducts(result)
    } catch (error) {
      handleerror(error)
    }
  }
  useEffect(()=>{
fetchproducts()
  },[])
  return (
    <div>
      <h1 className="text-white text-2xl">Welcome {loggedinuser}</h1>
      <button className="bg-white text-slate-900  font-semibold rounded p-2 mt-2" onClick={handlelogout}>Logout</button>
      <div className="text-white">
        {
         products&& products?.map((item)=>(
            <ul key={item.id}>
              <span>
                {item.name}:{item.price}
              </span>
            </ul>
          )) 
        }
        </div>
      <ToastContainer/>
    </div>
  )
}

export default Home
