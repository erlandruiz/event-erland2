import { EventContext } from "@/contexts/EventContext";
import { useContext } from "react";
import Event from "./Event";
import SkeletonGrid from "../SkeletonGrid";

const EventList = () => {
  const { filteredEvents, isLoading, error } = useContext(EventContext);
  if (error) return <p>Error:{error}</p>;
  if (filteredEvents.length === 0 && !isLoading) {
    return (
      <div className="h-[80vh]">
        <p className="text-white/80 text-center">No hay productos disponible</p>
      </div>
    );
  }

  if (isLoading) {
    return <SkeletonGrid itemCount={12} />;
  } else {
    return (
      <div >
        <h4 className="h4 mb-6">{filteredEvents.length} Resultados encontrados.</h4>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-[30px] mb-32">
          {filteredEvents.map((filteredEvent, index) => {
            return (
              <div key={filteredEvent.createdAt}>
                <Event event={filteredEvent} />
                {console.log(filteredEvent.createdAt)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default EventList;
