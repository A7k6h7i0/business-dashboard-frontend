import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/business-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location }),
    })
    const data = await response.json()
    // Store in localStorage for now
    localStorage.setItem('businessData', JSON.stringify(data))
    localStorage.setItem('businessName', name)
    localStorage.setItem('businessLocation', location)
    navigate('/result')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">📊 Mini Business Dashboard</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Business Name</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Location</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-semibold transition"
          >
            Get Business Data
          </button>
        </form>
      </div>
    </div>
  )
}
