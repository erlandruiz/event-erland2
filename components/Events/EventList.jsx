import { EventContext } from "@/contexts/EventContext";
import { useContext } from "react";
import Event from "./Event";
import SkeletonGrid from "../SkeletonGrid";

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
    return <SkeletonGrid itemCount={12}/>;
  } else {
    return (
      <div>
        {filteredEvents.map((filteredEvent, index) => {
          return (
            <div key={index}>
              <Event event={filteredEvent}/>
             
            </div>
          );
        })}
      </div>
    );
  }
};

export default EventList;
