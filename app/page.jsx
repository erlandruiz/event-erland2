"use client";

import EventList from "@/components/Events/EventList";
import Searchbar from "@/components/Searchbar/Searchbar";
import { EventContext } from "@/contexts/EventContext";
import { useContext } from "react";

const Home = () => {
  const { showEventList, handleClearSearch } = useContext(EventContext);
  console.log(showEventList);
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Searchbar />
        {/* limpiar busqueda */}
        <button
          onClick={() => {
            return handleClearSearch();
          }}
          className="text-[var(--color-accent)]"
        >
          Limpiar búsqueda
        </button>
      </div>

      {showEventList ? (
        <div className="container mx-auto">
          <EventList />
        </div>
      ) : (
        <div>
          <div className="container mx-auto">
            {/* slide próximos eventos */}
            <div>Control deslizante del próximo evento</div>
            {/* descarga  appy seccion */}
            <div>Descargar aplicaion </div>
            {/* eventos recomendados  */}
            <div>Eventos recomendados </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
