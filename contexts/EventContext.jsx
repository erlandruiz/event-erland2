"use client"
import { createContext, useState, useEffect, useMemo } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    //aplicar filter despues del  summit 
    const [appliedFilters, setAppliedFilters] = useState({
        searchTerm: ""
    })

    //filtered events based on the  applied filters
    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            //check search term
            const matchesSearch = appliedFilters.searchTerm ? event.title.toLowerCase().includes(appliedFilters.searchTerm.toLowerCase()) : true;
            return matchesSearch;
        });
    }, [events, appliedFilters]);
   

    //fetch para Events

    useEffect(() => {

        const fecthEvents = async () => {
            //set Loader
            setIsLoading(true)
            try {

                const res = await fetch("https://689632ca039a1a2b2891bdd1.mockapi.io/api/events");
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

    const handleSubmit =()=>{
        setIsLoading(true)
        setAppliedFilters({searchTerm})

        setTimeout(() => {
            setIsLoading(false)
        }, 7500);
      
    }

    const handleClearSearch =()=>{
        setSearchTerm("")
    }


    return (
        <EventContext.Provider value={{
            events,
            searchTerm,
            setSearchTerm, 
            filteredEvents,
            handleSubmit,
            handleClearSearch,
            isLoading,
            error
        }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventProvider