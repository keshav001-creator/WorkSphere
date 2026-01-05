import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "../api/axios"
import { RxCross2 } from "react-icons/rx";
import { MdWorkspacesFilled } from "react-icons/md";

const Login = () => {


  const navigate = useNavigate()


  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  useEffect(() => {
    if (window.innerWidth >= 768) {
      navigate("/")
    }
  }, [])





  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    try {

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        email: Email,
        password: Password
      }, { withCredentials: true })

      console.log(res)

      navigate("/dashboard")

    } catch (err) {
      console.log("error:", err)
    }
  }

  return (
    <div className="flex  text-center justify-center h-screen ">


      <div className="w-full p-3">

        <div className='flex items-center justify-between'>
          <div className="flex items-center gap-x-1">
            <MdWorkspacesFilled className='text-lg text-green-700' />
            <h1 className='font-bold  text-lg'>WorkSphere</h1>
          </div>
          <button onClick={()=>navigate("/")}><RxCross2 /></button>
        </div>
        
        <form className="flex flex-col gap-y-3 mt-20"
          onSubmit={handleLoginSubmit}>

          <div className="mb-1">
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-gray-600 text-sm">Login your Account</p>
          </div>

          <input className="text-sm p-2 bg-white border border-gray-400 outline-0 rounded"
            placeholder='Email'
            required
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input className="text-sm p-2 bg-white border border-gray-400 outline-0 rounded"
            placeholder='Password'
            required
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />


          <button className="bg-black text-white p-2  rounded-lg">Log In</button>
          <div className="text-sm">
            <p>Dont't have an account? <Link className="text-blue-500 underline text-xs"
              to="/register">Sign in</Link></p>
          </div>

        </form>
      </div>

    </div>
  )
}

export default Login