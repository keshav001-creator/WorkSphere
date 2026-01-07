import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const AppLayout = () => {


  return (

    <div className='min-h-screen flex flex-col '>

        <Navbar/>
        

       <div className='flex-1 flex overflow-y-auto pt-16'>
        <Outlet/>
       </div>


    </div>

  )
}

export default AppLayout