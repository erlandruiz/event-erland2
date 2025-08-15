import { EventContext } from "@/contexts/EventContext";
import { useContext } from "react";
import Event from "./Event";

const EventList = () => {
  const { filteredEvents, isLoading, error } = useContext(EventContext);
  if (error) return <p>Error:{error}</p>;
  if (filteredEvents.length === 0 && !isLoading) {
    return (
      <div>
        <p>No hay productos disponible</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        {filteredEvents.map((filteredEvent, index) => {
          return (
            <div key={index}>
              {/* <Event/> */}
              {filteredEvent.title}
              {console.log(filteredEvent)}
            </div>
          );
        })}
      </div>
    );
  }
};

export default EventList;
