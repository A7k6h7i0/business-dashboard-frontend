import { useEffect, useState } from 'react'

export default function Result() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('businessData')
    if (saved) setData(JSON.parse(saved))
  }, [])

  const regenerateHeadline = async () => {
    const name = localStorage.getItem('businessName')
    const location = localStorage.getItem('businessLocation')
    const res = await fetch(`http://localhost:5000/regenerate-headline?name=${name}&location=${location}`)
    const result = await res.json()
    setData((prev) => ({ ...prev, headline: result.headline }))
  }

  if (!data) return <p className="text-center mt-10">Loading business info...</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="bg-white shadow-2xl p-8 rounded-2xl max-w-xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          🔍 SEO Overview for Your Business
        </h2>
        <div className="space-y-3 text-gray-700 text-lg">
          <p>⭐ <strong>Rating:</strong> {data.rating}</p>
          <p>🧾 <strong>Reviews:</strong> {data.reviews}</p>
          <p>📰 <strong>SEO Headline:</strong> <em>"{data.headline}"</em></p>
        </div>
        <button
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
          onClick={regenerateHeadline}
        >
          🔁 Regenerate SEO Headline
        </button>
      </div>
    </div>
  )
}
