// src/App.jsx
function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-indigo-400">
          Personalización Extrema 🎮
        </h1>
        <p className="text-xl mt-2 text-gray-400">
          Consolas, Controles, Teclados y más...
        </p>
      </header>
      
      {/* Componente de ejemplo para un producto */}
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            {/* Aquí iría una imagen de una consola o control  */}
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Aerografía
            </div>
            <a href="#" className="block mt-1 text-lg leading-tight font-medium text-white hover:underline">
              Control "Cyber-Punk" PS5
            </a>
            <p className="mt-2 text-gray-500">
              Un diseño con detalles neón y líneas geométricas, pintado a mano con aerógrafo.
            </p>
            <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              ¡Diseña el Tuyo!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App