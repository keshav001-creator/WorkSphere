import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MdWorkspacesFilled } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import axios from "../api/axios"
import { UserContext } from "../context/UserContext";

const Register = () => {

  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const {setUser}=useContext(UserContext)


  useEffect(() => {
    if (window.innerWidth >= 768) {
      navigate("/")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
        fullName: {
          firstName,
          lastName
        },
        email: Email,
        password: Password
      }, { withCredentials: true })

      // console.log(res)
      setUser(res.data.User)

      navigate("/dashboard")

    } catch (err) {
      console.log("error:", err)
    }
  }


  
  return (


    <div className="flex  text-center justify-center h-screen ">

      <div className="w-full p-5">



        <div className='flex items-center justify-between'>
          <div className="flex items-center gap-x-1">
            <MdWorkspacesFilled className='text-lg text-green-700' />
            <h1 className='font-bold  text-lg'>WorkSphere</h1>
          </div>
          <button onClick={() => navigate("/")}><RxCross2 /></button>
        </div>

        <form className="flex flex-col gap-y-3 mt-10"
          onSubmit={handleSubmit}>

          <div className="mb-1">
            <h1 className="text-2xl font-bold">Sign Up</h1>
            <p className="text-gray-600 text-sm">Create your Account</p>
          </div>

          <input className="text-sm p-2 bg-white border border-gray-400 outline-0 rounded "
            placeholder='First name'
            required
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />


          <input className="text-sm p-2 bg-white border border-gray-400 outline-0 rounded"
            placeholder='Last name'
            required
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />


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


          <button className="bg-black text-white p-2  rounded-lg">Create Account</button>
          <div className="text-sm">
            <p>Already have an account? <Link className="text-blue-500 underline text-xs"
              to="/login">Sign in</Link></p>
          </div>

        </form>
      </div>

    </div>

  )
}

export default Register