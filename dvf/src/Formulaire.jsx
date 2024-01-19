import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HomeModernIcon } from "@heroicons/react/24/outline";
import logo from "./assets/logo.png";
import {
  MapContainer,
  TileLayer,
  Tooltip,
  Marker,
  Circle,
} from "react-leaflet";

export default function Formulaire() {
  const [latitude, setLatitude] = useState("45.75");
  const [longitude, setLongitude] = useState("4.85");
  const [rayon, setRayon] = useState("200");
  const validateInput = (value, name, min, max) => {
    if (value === "") {
      alert(`Le ${name} est obligatoire`);
      return false;
    }
    if (isNaN(value)) {
      alert(`Le ${name} doit être un nombre`);
      return false;
    }
    if (value < min) {
      alert(`Le ${name} doit être supérieur à ${min}`);
      return false;
    }
    if (value > max) {
      alert(`Le ${name} doit être inférieur à ${max}`);
      return false;
    }
    return true;
  };
  const navigateTo = useNavigate(); // hook useHistory pour la navigation
  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validateInput(rayon, "rayon", 0, 1000)) return;
    if (!validateInput(latitude, "latitude", -90, 90)) return;
    if (!validateInput(longitude, "longitude", -180, 180)) return;

    // Construire l'URL avec les paramètres de requête
    const queryParam = new URLSearchParams({
      latitude: latitude,
      longitude: longitude,
      rayon: rayon,
    }).toString();
    const apiUrl = `http://localhost:8080/api/transactions?${queryParam}`;

    fetch(apiUrl)
      .then((data) => {
        console.log("Success:", JSON.stringify(data));
        navigateTo(`/transactions?${queryParam}`); // Redirection vers la nouvelle page
      })
      .catch((error) => {
        console.error("Error during process :", error);
      });
  };

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      drag() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          setLatitude(newPosition.lat);
          setLongitude(newPosition.lng);
        }
      },
    }),
    []
  );

  return (
    <div className="">
      <div className="p-3 flex text-xl text-center font-bold border border-black justify-center">
        <img src={logo} alt="logo" className="mx-auto mr-10 w-20" />
        <h1 className="mx-auto flex-grow">
          Explorateur de données de valeurs foncières
        </h1>
        <div className="w-20 mr-10 invisible">
          {" "}
          {/* Élément factice pour équilibrage */}
        </div>
      </div>
      <div className="bg-blue-50 grid flex-row items-center">
        <HomeModernIcon className="w-28 h-25 mx-auto text-blue-700 pt-7" />
        <h2 className="text-2xl text-center font-bold text-blue-700">
          Rechercher les transactions par géolocalisation
        </h2>

        <MapContainer
          center={[latitude, longitude]}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle center={[latitude, longitude]} color="#2a81ca" radius={rayon}>
            <Tooltip>
              <span>Rayon des transactions</span>
            </Tooltip>
          </Circle>
          <Marker
            ref={markerRef}
            draggable={true}
            eventHandlers={eventHandlers}
            position={[latitude, longitude]}
          >
            <Tooltip>
              <span>Position actuelle<br/>(Rester appuyer pour déplacer)</span>
            </Tooltip>
          </Marker>
        </MapContainer>
        <form
          className="w-64 mx-auto p-2 mb-12 mt-4 max-w-sm"
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <input
              value={latitude}
              onChange={(ev) => setLatitude(ev.target.value)}
              type="text"
              placeholder=""
              className="block w-full p-2 mb-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500
                    appearance-none focus:outline-none focus:ring-0 peer"
              id="floating_outlined"
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Latitude
            </label>
          </div>
          <div className="relative">
            <input
              value={longitude}
              onChange={(ev) => setLongitude(ev.target.value)}
              type="text"
              placeholder=""
              className="block w-full p-2 mb-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500
                    appearance-none focus:outline-none focus:ring-0 peer"
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Longitude
            </label>
          </div>
          <div className="relative">
            <input
              value={rayon}
              onChange={(ev) => setRayon(ev.target.value)}
              type="text"
              placeholder=""
              className="block w-full p-2 mb-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none focus:outline-none focus:ring-0 peer"
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Rayon
            </label>
          </div>
          <div>
            <label
              htmlFor="default-range"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Rayon
            </label>
            <input
              max={1000}
              min={0}
              onChange={(ev) => setRayon(ev.target.value)}
              id="default-range"
              type="range"
              value={rayon}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <button className="bg-blue-500 text-white block w-full rounded-sm mt-2">
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
}
