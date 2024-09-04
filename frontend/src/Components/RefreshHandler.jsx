import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"



const RefreshHandler=({ setisauthenticated })=>{
    const location =useLocation()
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("token")){
            setisauthenticated(true)
            if(location.pathname === "/"||  
                  location.pathname === "/login"||
                location.pathname === "signup"){
   navigate("/home",{replace:false})
                }
        }
    },[location,navigate,setisauthenticated])
  return (
  null
  )
}

export default RefreshHandler
