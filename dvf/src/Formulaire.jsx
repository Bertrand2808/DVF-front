import { useState } from "react"

export default function Formulaire() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [rayon, setRayon] = useState()

  return (
    <div className=''>
      <div className="p-3 text-xl text-center font-bold">
        <h1>Explorateur de données de valeurs foncières</h1>
      </div>
      <div className='bg-blue-50 h-screen flex items-center'>
        <form className="w-64 mx-auto p-2 mb-12">
          <input value={latitude}
                  onChange={ev => setLatitude(ev.target.value)}
                  type="text" placeholder="Latitude"
                  className="block w-full rounded-sm p-2 mb-2 border"/>
          <input value={longitude}
                  onChange={ev => setLongitude(ev.target.value)}
                  type="text" placeholder="Longitude"
                  className="block w-full rounded-sm p-2 mb-2 border"/>
          <input value={rayon}
                  onChange={ev => setRayon(ev.target.value)}
                  type="text" placeholder="Rayon"
                  className="block w-full rounded-sm p-2 mb-2 border"/>
          <button className="bg-blue-500 text-white block w-full rounded-sm">Soumettre</button>
        </form>
      </div>
    </div>
  )
}
