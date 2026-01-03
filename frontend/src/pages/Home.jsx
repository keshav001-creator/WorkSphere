import { FaArrowRight } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { GrDocumentText } from "react-icons/gr";
import { BsStars } from "react-icons/bs";
import { MdTimelapse } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { MdWorkspacesFilled } from "react-icons/md";
import { useEffect, useState } from "react"
import { useNavigate, Link } from 'react-router-dom';
import axios from "../api/axios";

const Home = () => {


  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const navigate = useNavigate()


  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  // const isMobile = window.innerWidth < 768


  useEffect(() => {

    const checkAuth = async () => {

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getme`, { withCredentials: true })

      console.log(res)


    }

    checkAuth()

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

      console.log(res)

      navigate("/dashboard")

    } catch (err) {
      console.log("error:", err)
    }
  }

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
    <div className='relative min-h-screen'>

      <div className={showRegister || showLogin ? " pointer-events-none select-none " : "flex flex-col "}>

        <header className="nav flex p-4 items-center justify-between bg-gray-50 lg:p-6 lg:bg-white lg:border-b lg:border-gray-300">
          <div className='flex items-center gap-x-1 lg:gap-x-2'>
            <MdWorkspacesFilled className='text-lg text-green-700 lg:text-3xl' />
            <h1 className='font-bold  text-lg lg:text-3xl'>WorkSphere</h1>
          </div>
          <button onClick={() => setShowLogin(true)}
            className='border font-md rounded-md px-2 py-1 text-sm text-green-900 '>Sign in</button>


        </header>

        {/* hero */}
        <section className='mt-10 flex flex-col items-center justify-center px-4 text-center lg:flex lg:flex-row lg:items-center lg:justify-between lg:text-left lg:px-6 lg:py-10 lg:min-h-[80vh]'>

          <div className='lg:w-1/2'>

            <h1 className='text-3xl font-bold text-gray-800 lg:text-6xl lg:font-medium'>Your team's work,</h1>
            <h1 className='text-3xl font-bold text-gray-400  lg:text-6xl lg:font-medium '>organised and accelerated by <span className='text-green-700 '>AI</span></h1>
            <p className='text-sm text-gray-600 max-w-md mt-3 lg:text-xl'>Create task, collaborate on documents, and get AI-powered summaries all in one place. </p>

            <div className="flex justify-center gap-x-3 lg:gap-x-5 lg:justify-start">
              <button className='bg-gradient-to-b from-green-800 to-green-700 text-white p-2 rounded-md mt-5 lg:flex lg:items-center lg:justify-center lg:font-semibold lg:px-4'
                onClick={() => {
                  if (window.innerWidth < 768) {
                    navigate("/register")
                  } else {
                    setShowRegister(true)
                  }
                }
                } >
                Get Started <span className="lg:ml-3"></span><FaArrowRight className="text-center hidden lg:block" /></button>

              <button className='border border-gray-300 p-1 rounded-md mt-5 lg:px-4 lg:font-semibold ' >
                Learn More </button>
            </div>



          </div>

          <div className='lg:w-1/2 flex item-center justify-center'>
            <img className=' p-2 mt-5 object-contain w-2/3 lg:3/4'
              src="/collaboration.svg"></img>
          </div>


        </section>


        {/* features */}

        <section className='px-4 py-10 bg-gray-50 lg:min-h-[80vh]'>
          <h3 className='text-center font-bold text-xl  lg:text-4xl lg:font-semibold'>Everything your team needs</h3>
          <h3 className='text-center text-lg mb-5 lg:text-3xl text-gray-600'>Features</h3>
          <div className='grid gap-4 grid-cols-2 max-w-3xl mx-auto lg:grid-cols-4 lg:max-w-6xl lg:mt-15'>

            <div className='p-4 shadow-md rounded-lg bg-white  flex flex-col items-center text-center h-full lg:p-6 lg:flex lg:justify-start hover:shadow-lg transition'>
              <RiTeamFill className="text-xl text-green-800 lg:mb-3 lg:text-4xl " />
              <h4 className='font-bold  text-center text-sm lg:font-semibold lg:text-xl'>Team Workspaces</h4>
              <p className='text-xs text-gray-600 text-center mt-3 lg:text-lg'>Create a dedicated workspaces with role-based access control.</p>
            </div>

            <div className='p-4 shadow-md rounded-lg bg-white flex flex-col items-center h-full lg:p-6 hover:shadow-lg transition' >
              <BsStars className="text-xl text-green-800 lg:mb-3  lg:text-4xl" />
              <h4 className='font-bold  text-center text-sm lg:font-semibold lg:text-xl'>AI-Powered Documents</h4>
              <p className='text-xs text-gray-600 text-center mt-3 lg:text-lg '>Instantly summarise documents and save time with AI assistance.</p>
            </div>

            <div className='p-4 shadow-md rounded-lg bg-white  flex flex-col items-center h-full lg:p-6 hover:shadow-lg transition'>
              <MdTimelapse className="text-xl text-green-800 lg:mb-3  lg:text-4xl" />
              <h4 className='font-bold  text-center text-sm lg:font-semibold lg:text-xl'>Real-Time Updates</h4>
              <p className='text-xs text-gray-600 text-center mt-3 lg:text-lg'>Get instant notifications and collaborate without delays.</p>
            </div>


            <div className='p-4 shadow-md rounded-lg bg-white  flex flex-col items-center h-full lg:p-6 hover:shadow-lg transition'>
              <MdOutlineSecurity className="text-xl text-green-800  lg:mb-3  lg:text-4xl" />
              <h4 className='font-bold  text-center text-sm lg:font-semibold lg:text-xl '>Secure & Reliable</h4>
              <p className='text-xs text-gray-600 text-center mt-3 lg:text-lg '>Enterprise-grade security ensures your data is always protected.</p>
            </div>
          </div>

        </section>


        <section className="px-4 py-12">
          <h3 className="text-xl font-semibold text-center mb-6">
            How it works
          </h3>

          <div className="max-w-md mx-auto space-y-2 text-center text-sm text-gray-700">
            <p>1. Create a workspace</p>
            <p>2. Invite your team</p>
            <p>3. Manage tasks & documents with AI</p>
          </div>
        </section>

        {/* CTA + FOOTER */}
        <footer className="px-2 py-5  text-center bg-gray-50">
          <h3 className="text-lg font-semibold ">
            Start your workspace today
          </h3>


          <div className="mt-2 text-xs text-gray-500">
            © {new Date().getFullYear()} WorkSphere · Built by Me
          </div>
        </footer>


      </div>

      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-xl relative animate-in fade-in zoom-in duration-200">

            {/* CLOSE */}
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            {/* REGISTER FORM */}
            <form className="flex flex-col gap-y-3 mt-10"
              onSubmit={handleSubmit}>

              <div className="mb-1 flex flex-col items-center">
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


              <button className="bg-green-700 text-white p-2  rounded-lg">Create Account</button>
              <div className="text-sm">
                <p>Already have an account?
                  <Link
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        navigate("/login")
                      } else {
                        setShowRegister(false)
                        setShowLogin(true)
                      }
                    }}
                    className="text-blue-500 underline text-xs">Sign in</Link></p>
              </div>

            </form>


          </div>
        </div>
      )}


      {showLogin && (


        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className=" relative w-full bg-white rounded-xl max-w-sm p-4 shadow-xl ">

            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <form className="flex flex-col gap-y-3 mt-10"
              onSubmit={handleLoginSubmit}>

              <div className="mb-1 flex flex-col text-center">
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


              <button className="bg-green-700 text-white p-2  rounded-lg">Log In</button>
              <div className="text-sm">
                <p>Dont't have an account? <Link

                  className="text-blue-500 underline text-xs"
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      navigate("/register")
                    } else {
                      setShowRegister(true)
                      setShowLogin(false)
                    }
                  }}
                >Sign up</Link></p>
              </div>

            </form>
          </div>
        </div>

      )}



    </div>
  )
}

export default Home
