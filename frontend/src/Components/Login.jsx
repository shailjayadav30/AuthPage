import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { handleerror, handlesuccess } from "../utils";

const formFields = [
  { label: "Email", type: "email", name: "email", placeholder: "Enter your email" },
  { label: "Password", type: "password", name: "password", placeholder: "Enter your password" },
];

function Login() {
  const [logininfo,setlogininfo]=useState({
    email:"",
    password:""
  })
  const navigate = useNavigate();
  const handleonchange=(e)=>{
const {name,value}= e.target;
const copylogininfo={...logininfo};
copylogininfo[name]=value;
setlogininfo(copylogininfo)
  }

  const  handlelogin  =   async(e)=>{
e.preventDefault();
const {email,password}=logininfo;
if(!email|| !password){
  return handleerror("email,password is required")
}
try {
  const  url='https://auth-page-api.vercel.app/auth/login';
  const response=await fetch(url,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(logininfo)
  })
const result = await response.json();
const {succes,message,jwttoken,name,error}=result;
  if(succes){
   handlesuccess(message);
   localStorage.setItem("token",jwttoken)
   localStorage.setItem("loggedinuser",name)
  console.log('Navigating to /home...');

   setTimeout(() => {
     navigate('/home');
console.log('Navigation completed.');

   }, 1000); 
  }

  else if(error){
    const details=error?.details[0].message;
    handleerror(details)
  }
  else if(!succes){
    handleerror(message)
  }

console.log(result)

} catch (error) {
  handleerror(error.message|| "an error occured")
}
  }
  return (
    <div className="rounded border-4 p-4 text-slate-950 border-white w-[20rem] bg-slate-200 ">
      <h1 className="text-center font-semibold text-2xl mb-2">Login</h1>
      <form onSubmit={handlelogin} className=" flex flex-col gap-2">
        {formFields.map((field, index) => (
          <div key={index} className=" flex flex-col">
            <label className="text-lg font-semibold">{field.label}</label>
            <input className="p-1 outline-none focus:border-2 rounded  focus:border-slate-900 placeholder:text-sm "
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              autoFocus={index === 0}
              onChange={handleonchange} 
              value={logininfo[field.name]}
        //       Autofocus only on the first field
            />
          </div>
        ))}
        <button type="submit" className="bg-slate-900 text-slate-200 font-semibold rounded py-2 mt-2">Login</button>
        <span className="text-center text-slate-900 ">
          Dont have an account?
          <Link to="/signup" className="text-blue-800 underline">
            Signup
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
