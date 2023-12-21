export default function Formulaire() {
  return (
    <div className='bg-blue-50 h-screen '>
      <form className="w-64 mx-auto p-2 mb-2">
        <input type="text" placeholder="Latitude" className="block w-full rounded-sm p-2 mb-1"/>
        <input type="text" placeholder="Longitude" className="block w-full rounded-sm p-2 mb-1"/>
        <input type="text" placeholder="Rayon" className="block w-full rounded-sm p-2 mb-1"/>
        <button className="bg-blue-500 text-white block w-full rounded-sm">Soumettre</button>
      </form>
    </div>
  )
}
