import { FaArrowRight } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { RiRobot3Line } from "react-icons/ri";
import { CiTimer } from "react-icons/ci";
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

    try{

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getme`, { withCredentials: true })

      console.log(res)
      
    }catch(err){

    }


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
    <div className='relative min-h-screen '>


      <div className={showRegister || showLogin ? " pointer-events-none select-none " : "flex flex-col "}>

        <header className="nav sticky top-0 z-30 flex p-4 items-center justify-between  lg:p-4 bg-white lg:border-b border-gray-400">
          <div className='flex items-center gap-x-1 lg:gap-x-2'>
            <MdWorkspacesFilled className='text-md text-gray-500 lg:text-3xl' />
            <h1 className='font-bold  text-lg lg:text-2xl'>WorkSphere</h1>
          </div>

          <div className="hidden lg:flex items-center justify-center gap-x-10">
            <a href="#features" className="hover:text-black font-semibold">Features</a>
            <a href="#how-it-works" className="hover:text-black font-semibold">How it works</a>
          </div>
          <button onClick={() => {
            if (window.innerWidth < 768) {
              navigate("/login")
            } else {
              setShowLogin(true)
            }
          }}
            className='border font-md rounded-md px-2 py-1 text-sm text-black lg:px-8 lg:py-2 lg:mr-6 lg:font-semibold hover:bg-black hover:text-white transition'>
            Sign in</button>


        </header>

        {/* hero */}

        <section className='relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4 text-center lg:px-6 '>

          <video
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10 hidden lg:block"
          >
            <source
              src="https://media.usepylon.com/PYLON_HOMEPAGE_HERO_Desktop_v006_Animation_Only.mp4"
              type="video/mp4"
            />
          </video>

          <video

            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10 lg:hidden "
          >
            <source
              src="https://media.usepylon.com/PYLON_HOMEPAGE_HERO_Mobile_v001_Animation_Only.mp4"
              type="video/mp4"
            />
          </video>

          <div className='relative z-10 max-w-2xl mx-auto lg:h-full'>

            <h1 className='text-3xl font-bold text-black lg:text-6xl lg:font-medium lg:text-center'>Your team's work,</h1>
            <h1 className='text-3xl font-bold text-black  lg:text-6xl lg:font-medium lg:text-center'>organised and accelerated by <span className='text-gray-500'>AI</span></h1>
            <p className='text-sm text-black mt-3 lg:text-xl lg:text-center'>Create task, collaborate on documents, and get AI-powered summaries all in one place. </p>

            <div className="flex justify-center gap-x-3 lg:gap-x-5 ">
              <button className='bg-black text-white text-sm p-2 rounded-md mt-5 lg:flex lg:items-center lg:justify-center lg:font-semibold lg:px-4 hover:shadow-lg transition'
                onClick={() => {
                  if (window.innerWidth < 768) {
                    navigate("/register")
                  } else {
                    setShowRegister(true)
                  }
                }
                } >
                Get Started <span className="lg:ml-3"></span><FaArrowRight className="text-center hidden lg:block" /></button>

              <button className='border border-gray-300 p-1 rounded-md mt-5 lg:px-4 lg:font-semibold hidden lg:block' >
                Learn More </button>
            </div>




          </div>






        </section>


        {/* features */}

        <section className='px-4 py-10 lg:min-h-screen bg-gray-50 '>

          <h3 className='text-center font-bold text-xl  lg:text-4xl lg:font-semibold'>Everything your team needs</h3>
          <h3 className='text-center text-lg mb-5 lg:text-3xl text-gray-600 lg:hidden'>Features</h3>



          <div className='grid gap-4 grid-cols-1 max-w-3xl mx-auto lg:grid-cols-4 lg:max-w-6xl lg:mt-15 '>



            <div className="group relative overflow-hidden p-4 bg-yellow-100 lg:bg-white border border-gray-300 lg:p-6 hover:shadow-lg transition">
              <div className="absolute bottom-0 left-0 w-full h-0 bg-yellow-100 transition-all duration-700 ease-out group-hover:h-full"></div>
              <div className="relative z-10">
                <RiTeamLine className="text-5xl mb-21" />
                <h4 className="font-semibold mt-2 lg:text-xl">Team Workspaces</h4>
                <p className="text-gray-700 mt-8 text-xs lg:text-sm">
                  Create dedicated workspaces with role-based access control.
                </p>
              </div>
            </div>



            <div className="group relative overflow-hidden p-4   bg-green-100 lg:bg-white border border-gray-300 lg:p-6 hover:shadow-lg transition">
              <div className="absolute bottom-0 left-0 w-full h-0 bg-green-100 transition-all duration-700 ease-out group-hover:h-full"></div>
              <div className="relative z-10">
                <RiRobot3Line className="text-5xl mb-21" />
                <h4 className="font-semibold mt-2 lg:text-xl">AI-Powered Documents</h4>
                <p className="text-gray-700 mt-8 text-xs lg:text-sm">
                  Instantly summarise documents and save time with AI assistance.
                </p>
              </div>
            </div>



            <div className="group relative overflow-hidden p-4 bg-amber-200 lg:bg-white border border-gray-300 lg:p-6 hover:shadow-lg transition">
              <div className="absolute bottom-0 left-0 w-full h-0 bg-amber-200 transition-all duration-700 ease-out group-hover:h-full"></div>
              <div className="relative z-10">
                <CiTimer className="text-5xl mb-21" />
                <h4 className="font-semibold mt-2 lg:text-xl">Real-Time Updates</h4>
                <p className="text-gray-700 mt-8 text-xs lg:text-sm">
                  Get instant notifications and collaborate without delays.
                </p>
              </div>
            </div>



            <div className="group relative overflow-hidden p-4 bg-purple-200 lg:bg-white border border-gray-300 lg:p-6 hover:shadow-lg transition">
              <div className="absolute bottom-0 left-0 w-full h-0 bg-purple-200 transition-all duration-700 ease-out group-hover:h-full"></div>
              <div className="relative z-10">
                <MdOutlineSecurity className="text-5xl mb-21" />
                <h4 className="font-semibold mt-2 lg:text-xl">Secure & Reliable</h4>
                <p className="text-gray-700 mt-8 text-xs lg:text-sm">
                  Enterprise-grade security ensures your data is always protected.
                </p>
              </div>
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

            >
              <RxCross2 className="absolute top-3 right-3 text-gray-400 hover:text-black" />
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


              <button className="bg-black text-white p-2  rounded-lg">Create Account</button>
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

            >
              <RxCross2 className="absolute top-3 right-3 text-gray-400 hover:text-black" />
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


              <button className="bg-black text-white p-2  rounded-lg mt-1">Log In</button>
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
