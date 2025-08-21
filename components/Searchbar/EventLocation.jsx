import { EventContext } from "@/contexts/EventContext";
import { useContext } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EventLocation = () => {
  const { events, selectedLocation, setSelectedLocation } =
    useContext(EventContext);
  //Genera una lista  unica de locaciones de futuros eventos

  const uniqueLocations = [
    "Todos", //por defecto todos
    //uso del set para evitar datos duplicados
    ...new Set(
      events
        .filter((event) => {
          const eventDate = new Date(event.date); //convierte el evant date a un objeto
          const currentDate = new Date(); //obtiene la fecha actual

          //incluye eventos que ocurren despues de la fecha
          if (eventDate > currentDate) return true;

          //incluye eventos que se dan hoy pero solo si el tiempo no ha pasado
          if (eventDate.toDateString() === currentDate.toDateString()) {
            const eventTime = eventDate.getTime(); //consigue el tiempo en milisegundos
            const currentTime = currentDate.getTime(); //consigue el currentTime en milisegundos
            return eventTime > currentTime; //Incluir evento si aún está próximo hoy
          }
          //excluye eventos pasados.
          return false;
        })
        .map((event) => {
          return event.location; //extrae  la loacion  de cada evento
        })
    ),
  ];
  console.log(uniqueLocations);

  return (
    <div>
      {/* icon */}
      <div></div>
      <Select
        value={selectedLocation}
        onValueChange={(value) => {
          return setSelectedLocation(value);
        }}
      >
        <SelectTrigger className="bg-transparent border-none focus:ring-0 focus:ring-offset-0 text-left p-0">
          <SelectValue placeholder="Ubicación del producto" />
        </SelectTrigger>
        <SelectContent>
          {/* <SelectGroup className="bg-[var(--color-accent)]"> */}
          <SelectGroup>
            <SelectLabel>Ubicación</SelectLabel>
            {uniqueLocations.map((uniqueLocation, index) => {
              return (
                <SelectItem
                  value={uniqueLocation === "Todos" ? null : uniqueLocation}
                  key={index}
                >
                  {uniqueLocation}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventLocation;
