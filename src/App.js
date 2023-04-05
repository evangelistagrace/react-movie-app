import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import './App.css'
import SearchIcon from './search.svg'

const API_KEY = '888d2f27'
const API_URL = `http://www.omdbapi.com?apikey=${API_KEY}`

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    // get movie url
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()
        setMovies(data.Search)
    }

    //runs everytime component loads
    useEffect(() => {
        searchMovies('batman')
    }, [])

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    //need onchange event listener to enable typing in input field
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)} 
                />
            </div>

            {
                movies.length > 0 ? (
                    <div className="container">
                        {
                            movies.map(movie => (
                                <MovieCard movie={movie} />
                            ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    )
}

export default App