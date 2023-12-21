import { useState } from "react"
import {HomeModernIcon} from '@heroicons/react/24/outline'
import logo from './assets/logo.png'
export default function Formulaire() {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [rayon, setRayon] = useState('')
  const validateInput = (value, name, min, max) => {
    if (value === '') {
      alert(`Le ${name} est obligatoire`)
      return false
    }
    if (isNaN(value)) {
      alert(`Le ${name} doit être un nombre`)
      return false
    }
    if (value < min) {
      alert(`Le ${name} doit être supérieur à ${min}`)
      return false
    }
    if (value > max) {
      alert(`Le ${name} doit être inférieur à ${max}`)
      return false
    }
    return true
  }
  const handleSubmit = ev => {
    ev.preventDefault()
    if (!validateInput(rayon, 'rayon', 0, 100)) return
    if (!validateInput(latitude, 'latitude', -90, 90)) return
    if (!validateInput(longitude, 'longitude', -180, 180)) return
    console.log('latitude', latitude)
    console.log('longitude', longitude)
    console.log('rayon', rayon)
  }

  return (
    <div className=''>
      <div className="p-3 flex text-xl text-center font-bold border border-black justify-center">
        <img src={logo} alt="logo" className="mx-auto mr-10 w-20"/>
        <h1 className="mx-auto flex-grow">Explorateur de données de valeurs foncières</h1>
        <div className="w-20 mr-10 invisible"> {/* Élément factice pour équilibrage */}</div>
      </div>
      <div className='bg-blue-50 h-screen flex-row items-center'>
        <HomeModernIcon className="w-28 h-25 mx-auto text-blue-700 pt-7"/>
        <h2 className="text-2xl text-center font-bold text-blue-700">Rechercher les transactions par géolocalisation</h2>
        <form className="w-64 mx-auto p-2 mb-12 mt-4 max-w-sm" onSubmit={handleSubmit}>
          <input value={latitude}
                  onChange={ev => setLatitude(ev.target.value)}
                  type="text" placeholder="Latitude"
                  className="block w-full p-2 mb-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 "/>
          <input value={longitude}
                  onChange={ev => setLongitude(ev.target.value)}
                  type="text" placeholder="Longitude"
                  className="block w-full p-2 mb-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 "/>
          <input value={rayon}
                  onChange={ev => setRayon(ev.target.value)}
                  type="text" placeholder="Rayon"
                  className="block w-full p-2 mb-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 "/>
          <button className="bg-blue-500 text-white block w-full rounded-sm">Soumettre</button>
        </form>
      </div>
    </div>
  )
}
