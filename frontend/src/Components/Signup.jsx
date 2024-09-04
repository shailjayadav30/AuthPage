import { useState } from "react";
import { Link} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleerror, handlesuccess } from "../utils";
import { useNavigate } from 'react-router-dom';
const formFields = [
  { label: "Name", type: "text", name: "name", placeholder: "Enter your name" },
  { label: "Email", type: "email", name: "email", placeholder: "Enter your email" },
  { label: "Password", type: "password", name: "password", placeholder: "Enter your password" },
];

function Signup() {
  const [signupinfo,setsignupinfo]=useState({
    name:"",
    email:"",
    password:""
  })
  const navigate = useNavigate();
  const handleonchange=(e)=>{
const {name,value}= e.target;
const copysignupinfo={...signupinfo};
copysignupinfo[name]=value;
setsignupinfo(copysignupinfo)
  }

  const  handlesignup  =   async(e)=>{
e.preventDefault();
const {name,email,password}=signupinfo;
if(!name|| !email|| !password){
  return handleerror("name,email,password is required")
}
try {
  const  url='http://localhost:8080/auth/signup';
  const response=await fetch(url,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(signupinfo)
  })
const result = await response.json();
const {succes,message,error}=result;
 if(succes){
  handlesuccess(message);
  setTimeout(() => {
    navigate('/login');
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
      <h1 className="text-center font-semibold text-2xl mb-2">Signup</h1>
      <form onSubmit={handlesignup} className=" flex flex-col gap-2">
        {formFields.map((field, index) => (
          <div key={index} className=" flex flex-col">
            <label className="text-lg font-semibold">{field.label}</label>
            <input className="p-1  outline-none focus:border-2 rounded  focus:border-slate-900 placeholder:text-sm "
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              autoFocus={index === 0}
              onChange={handleonchange} 
              value={signupinfo[field.name]}
        //       Autofocus only on the first field
            />
          </div>
        ))}
        <button type="submit" className="bg-slate-900 text-slate-200 font-semibold rounded py-2 mt-2">Signup</button>
        <span className="text-center text-slate-900 ">
          Already have an account?
          <Link to="/login" className="text-blue-800 underline">
            Login
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
