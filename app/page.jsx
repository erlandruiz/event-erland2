"use client"

import { useContext } from "react"
import { EventContext } from "@/contexts/EventContext"


const Home = ()=>{
const {events}=   useContext(EventContext)
console.log(events)
  return (
    <div>
     HOME
    </div>
  )
}

export default Home