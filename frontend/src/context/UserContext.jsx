import { useContext, useState, useEffect, createContext } from "react"
import axios from "../api/axios"


export const UserContext = createContext()

export const UserProvider = ({ children }) => {


    const [user, setUser] = useState(null)


    useEffect(() => {

        const fetchUser = async () => {
            try {

                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getUser`, { withCredentials: true })
                setUser(res.data.user)

            } catch (err) {
                console.log(err)
            }
        }
        fetchUser()
    }, [])


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}