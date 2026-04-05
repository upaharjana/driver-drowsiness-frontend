import React, { useEffect, useState } from 'react'

interface AIMapPageProps {
  onBack: () => void
  triggerEmergency: () => void
}

const AIMapPage: React.FC<AIMapPageProps> = ({ onBack, triggerEmergency }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [status, setStatus] = useState<'idle' | 'good' | 'drowsy' | 'asleep'>('idle')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        },
        () => {
          setLocation({ lat: 37.7749, lng: -122.4194 }) // fallback: San Francisco
        }
      )
    } else {
      setLocation({ lat: 37.7749, lng: -122.4194 })
    }
  }, [])

  useEffect(() => {
    if (status === 'asleep') {
      // Jump to emergency flow
      triggerEmergency()
    }
  }, [status, triggerEmergency])

  const centerParam = location ? `${location.lat.toFixed(5)}%2C${location.lng.toFixed(5)}` : '37.77490%2C-122.41940'

  return (
    <div className="w-full h-[80vh] bg-transparent rounded overflow-hidden flex gap-4">
      {/* Map Area */}
      <div className="flex-1 bg-black rounded overflow-hidden shadow-lg">
        <div className="w-full h-full">
          {/* Using OpenStreetMap embed so no external API key is required. Replace with react-leaflet or Google Maps API for full navigation features. */}
          <iframe
            title="AI Map"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${location ? `${location.lng - 0.05}%2C${location.lat - 0.03}%2C${location.lng + 0.05}%2C${location.lat + 0.03}` : '-122.47%2C37.75%2C-122.37%2C37.80'}&layer=mapnik&marker=${centerParam}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
          ></iframe>
        </div>
      </div>

      {/* Side Post Card */}
      <div className="w-[360px] bg-[#0f1724] rounded-lg p-6 shadow-lg border border-slate-700 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl">DR</div>
          <div>
            <h3 className="text-white font-bold text-lg">AI Driving Monitor</h3>
            <p className="text-slate-400 text-sm">Realtime ML driving-status (placeholder)</p>
          </div>
        </div>

        <div className="bg-[#0b1220] p-4 rounded border border-slate-800">
          <p className="text-slate-300 text-sm mb-2">Status</p>
          <div className="text-white font-bold text-2xl">
            {status === 'idle' && 'Waiting for ML'}
            {status === 'good' && 'Driving Good ✅'}
            {status === 'drowsy' && 'Drowsy ⚠️'}
            {status === 'asleep' && 'No Response 🚨'}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button onClick={() => setStatus('good')} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-bold text-white">Simulate: Good</button>
          <button onClick={() => setStatus('drowsy')} className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded font-bold text-white">Simulate: Drowsy</button>
          <button onClick={() => setStatus('asleep')} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-bold text-white">Simulate: Asleep</button>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          {status === 'good' && <div className="text-sm text-green-400 font-semibold">Great job! Keep driving safely. 🎉</div>}
          {status === 'drowsy' && <div className="text-sm text-yellow-300 font-semibold">You're looking drowsy. Please take a short break or pull over safely.</div>}
          {status === 'asleep' && <div className="text-sm text-red-400 font-semibold">No response detected. Triggering emergency contact...</div>}

          <div className="flex justify-between items-center">
            <button onClick={onBack} className="px-4 py-2 rounded border border-slate-600 text-slate-200 hover:bg-slate-800">Back</button>
            <button onClick={() => window.open('https://www.google.com/maps', '_blank')} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Open in Maps</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIMapPage
