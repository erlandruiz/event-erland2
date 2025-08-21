"use client";
import { createContext, useState, useEffect, useMemo } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEventList, setShowEventList] = useState(false);

  //Ingresos de filtros actuales
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  //aplicar filter despues del  summit
  const [appliedFilters, setAppliedFilters] = useState({
    searchTerm: "",
    selectedLocation: "",
  });

  //filtered events based on the  applied filters
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      //check search term
      const matchesSearch = appliedFilters.searchTerm
        ? event.title
            .toLowerCase()
            .includes(appliedFilters.searchTerm.toLowerCase())
        : true;

      //chequea locaciones
      const matchesLocation = appliedFilters.selectedLocation
        ? event.location.toLowerCase() ===
          appliedFilters.selectedLocation.toLowerCase()
        : true;
      return matchesSearch && matchesLocation;
    });
  }, [events, appliedFilters]);

  //fetch para Events

  useEffect(() => {
    const fecthEvents = async () => {
      //set Loader
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://689632ca039a1a2b2891bdd1.mockapi.io/api/events"
        );
        if (!res.ok) throw new Error("Failed to fecth events");
        const data = await res.json();
        setEvents(data);
        //stop loader
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        //stop loader
        setIsLoading(false);
      }
    };
    fecthEvents();
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    setShowEventList(true);
    setAppliedFilters({ searchTerm, selectedLocation });

    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowEventList(false);
    setSelectedLocation("");
  };

  return (
    <EventContext.Provider
      value={{
        events,
        searchTerm,
        setSearchTerm,
        filteredEvents,
        handleSubmit,
        handleClearSearch,
        isLoading,
        error,
        showEventList,
        selectedLocation,
        setSelectedLocation,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
