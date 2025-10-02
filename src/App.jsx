import SearchBar from "./components/SearchBar"
import WeatherDisplay from "./components/WeatherDisplay"


function App() {

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="w-96 h-auto bg-white rounded-lg shadow-lg p-4">
        <SearchBar/>
        <WeatherDisplay/>
      </div>
    </div>
  )
}

export default App
