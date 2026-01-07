import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/UserContext"
import socket from "../Socket"
const NotificationListener = () => {

    const { user } = useContext(UserContext)

    useEffect(() => {

        if (!user) {
            return
        }

        const handleNotification = (data) => {
            console.log("New notification:", data)
        }

        socket.on("notification", handleNotification)

        return () => {
            socket.off("notification", handleNotification)
        }


    }, [user])


    return null
}

export default NotificationListener