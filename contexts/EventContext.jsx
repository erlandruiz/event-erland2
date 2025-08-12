"use client"
import { createContext, useState, useEffect, useMemo } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //fetch para Events

    useEffect(() => {

        const fecthEvents = async () => {
            //set Loader
            setIsLoading(true)
            try {

                const res = await fetch("http://localhost:4000/events");
                if (!res.ok) throw new Error("Failed to fecth events")
                const data = await res.json()
                setEvents(data);
                //stop loader
                setIsLoading(false)

            } catch (err) {
                setError(err.message)
                //stop loader
                setIsLoading(false)
            }
        }
        fecthEvents()

    }, [])

    return(
        <EventContext.Provider value={{ events }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventProvider