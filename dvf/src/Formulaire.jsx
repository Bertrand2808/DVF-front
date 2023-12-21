import { useState } from "react"

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
      <div className="p-3 text-xl text-center font-bold">
        <h1>Explorateur de données de valeurs foncières</h1>
      </div>
      <div className='bg-blue-50 h-screen flex items-center'>
        <h2 className="flex items-center text-center">test</h2>
        <form className="w-64 mx-auto p-2 mb-12" onSubmit={handleSubmit}>
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
