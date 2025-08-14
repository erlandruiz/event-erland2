"use client"

import { useContext } from "react"
import EventSearch from "./EventSearch"
import { EventContext } from "@/contexts/EventContext"

const Searchbar =()=>{

    const {handleSubmit} = useContext(EventContext)
return(
    <div className="bg-white/5 w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-max p-8 xl:pl-8 xl:pr-2 h-auto xl:h-[70px] rounded-3xl xl:rounded-full backdrop-blur-[20px] flex flex-col xl:flex-row items-center gap-6 mx-auto text-sm z-50">
        {/* EventSearch */}
      <div><EventSearch/></div>
      {/* EventLocation */}
      <div>Event Location</div>
      {/* EventDate */}
      <div>Event Date</div>
      {/* EventType */}
      <div>Event Type</div>
      {/* button submit */}
      <button onClick={handleSubmit} className="btn bg-[var(--color-accent)]">Submit</button>
    </div>
)
}

export default Searchbar