import { useContext, useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../api/axios"
import socket from "../Socket"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {


    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notifications, setNotifications] = useState([])
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {

            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getUser`, { withCredentials: true })
            console.log("res", res)

            setUser(res.data.user)

        } catch (err) {
            if (err.response?.status === 401) {
                setUser(null)
                navigate("/")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])


    const fetchNotifications = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notifications`, { withCredentials: true })
            console.log(res.data.notifications)
            setNotifications(res.data.notifications)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        if (user) {
            fetchNotifications()
        } else {
            setNotifications([])
            return
        }

    }, [user])



    useEffect(() => {
        if (user) {
            socket.connect()
        } else {
            socket.disconnect()
        }

    }, [user])





    return (
        <UserContext.Provider value={{ user, setUser, loading, notifications, setNotifications }}>
            {children}
        </UserContext.Provider>
    )
}