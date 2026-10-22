import { useMemo, useState } from 'react'
import './App.css'

const movies = [
  {
    id: 1,
    title: ' tiranga',
    year: 2024,
  
    language: 'English',
    poster:
'https://assets.gadgets360cdn.com/pricee/assets/product/202209/Code_Name_Tiranga_1663878733.jpg',
  },
  {
    id: 2,
    title: 'Retro',
    year: 2025,
   
    language: 'English',
    poster:
'https://img.studioflicks.com/wp-content/uploads/2025/04/30201215/Retro-Movie-HQ-Posters-10.jpg',

  },
  {
    id: 3,
    title: 'toxic',
    year: 2022,
 
    language: 'English',
    poster:
      'https://img.studioflicks.com/wp-content/uploads/2026/01/08192338/fJBAfLiNfovSAb6KjkIndpF3Sm7.jpg',
  
  },
  {
    id: 4,
    title: 'Past Lives',
    year: 2021,
  
    language: 'Korean, English',
    poster:
'https://images.openai.com/static-rsc-4/IUpXUzBNSk9hrWMPNXv_PcZp4E-8ExQo5GESarbeLEdNjkTQpVtgSZW6RVzWNq5mkQJ3oLQPHIbFF-NBPmSnv_qc5sTffa61r3DUd_szL3MnaTIwGAusPviQCFsPHdgd0MmfhDcsRiGmtlS7NEplMv669qYHDIXG6y83QJIb9MQ?purpose=inline',  
   },
   
   {
    
    id: 5,
    title: 'titanic',
    year: 1997,
   
    language: 'English',
    poster:
'https://images.openai.com/static-rsc-4/4zjgtPGYpOFNQWJaqr3ja75qJJE-siahNgS3jUvRRHhW4qBJ_9x1HEUHVQM3ToqJD0XDap2tJyNwPBq8gf_E9uoLpI9KwmLCwylJoT4QRyk5JEtOwMmRxUrG-sxMnJq93HTw65ku9eoZU9DIJD2dlzQ0fThfx9-Bpnx37jGwoioc8bvz3FRRZU3HaSO5pQ3H?purpose=fullsize',   
  },
  {
    id: 6,
    title: 'Inception',
    year: 2010,

    language: 'English',
    poster:
      'https://images.openai.com/static-rsc-4/7WZk5uf6R4qVgWnKr9ndx-VIvoJcOw_2goPVpbvQmAV8U2Pwtd-mJtIORx-evx36YZIFGcPzxeytHFfC7c4n2OfUww3_8iydZW2p47FUNmiTRKUEfAs3dXPg623md5NMDejiVCxPyOBOIGPMlkOw69NgmIgagl6ubfRv8vj2okyYQIgg-vGqUnwNevhpo9N-?purpose=fullsize',
   
  },
  {
    id: 7,
    title: 'Avtar',
    year: 2009,
 
    language: 'English',
    poster:
'https://images.openai.com/static-rsc-4/4MherjbPh7lr0P_pKRrttotkpquM1LOAiQSPZGYL5Et4SE3rkMbUB__AxutADEQfbMvtESncHbSt_9_EHY7FKYu3B8pjJuo6nfcIfgizZ2q9e4Fd39OxpWvgEw4psqQNtyL7MHCC0M3XTn38mGq8NVBNmeDvOw7ducCCyb9DyibfOwTH1g9EoUZnuVBj9zb6?purpose=fullsize',   
  },
  {
    id: 8,
    title: 'KGF Chapter 2',
    year: 2022,
  
    language: 'English, Mandarin',
    poster:
'https://images.openai.com/static-rsc-4/zvOI4APj9PQmEzIInXEiW7ix8Jwo1-XofCGzt6FSat3dVVlIEx728RzyoxSMnIRR7mwmrbmRJrxiBWyRisSkw7ueCfb-NPTTg_mjHKjzfUTwF4O_CA4X-S1csiprMmfBCWTxcBc0S-JLeKF9bNqCW5fs2Yqb5U2RCDzoCX4UZOBX9vykLM66Jwp5XbnvfxFr?purpose=fullsize',  
  },
]

const genres = ['All films', 'Drama', 'Sci-Fi', 'Action', 'Romance', 'Comedy', 'Animation']

function MovieCard({ movie, isFavorite, onFavorite, onSelect }) {
  return (
    <article className="movie-card">
      <button
        className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
        type="button"
        aria-label={isFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
        onClick={() => onFavorite(movie.id)}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
      <button className="poster-button" type="button" onClick={() => onSelect(movie)}>
        <img className="movie-poster" src={movie.poster} alt={`${movie.title} poster`} />
        <span className="poster-overlay">View film <span aria-hidden="true">↗</span></span>
      </button>
      <div className="movie-meta">
        <div>
          <h3>{movie.title}</h3>
          <p>{movie.year} <span className="meta-dot">·</span> {movie.genre}</p>
        </div>
        <span className="rating"><span aria-hidden="true">★</span> {movie.rating}</span>
      </div>
    </article>
  )
}

function MovieDetails({ movie, onClose, isFavorite, onFavorite }) {
  if (!movie) return null

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close details">
          ×
        </button>
        <img className="details-poster" src={movie.poster} alt="" />
        <div className="details-content">
          <span className="eyebrow">{movie.genre} <span>·</span> {movie.year}</span>
          <h2 id="details-title">{movie.title}</h2>
          <div className="details-facts">
            <span className="rating"><span aria-hidden="true">★</span> {movie.rating}</span>
            <span>{movie.runtime}</span>
            <span>{movie.language}</span>
          </div>
         
          <button
            className={`button ${isFavorite ? 'button-secondary' : 'button-primary'}`}
            type="button"
            onClick={() => onFavorite(movie.id)}
          >
            {isFavorite ? '♥  In your watchlist' : '+  Add to watchlist'}
          </button>
        </div>
      </section>
    </div>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All films')
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [user, setUser] = useState(() => localStorage.getItem('movie-library-user') || '')
  const [showSignIn, setShowSignIn] = useState(false)
  const [email, setEmail] = useState('')

  const filteredMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return movies.filter((movie) => {
      const matchesGenre = genre === 'All films' || movie.genre === genre
      const matchesQuery =
        !normalizedQuery ||
        `${movie.title} ${movie.genre} ${movie.year}`.toLowerCase().includes(normalizedQuery)
      const matchesFavorites = !showFavorites || favorites.includes(movie.id)
      return matchesGenre && matchesQuery && matchesFavorites
    })
  }, [favorites, genre, query, showFavorites])

  function toggleFavorite(movieId) {
    setFavorites((current) =>
      current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId],
    )
  }

  function signIn(event) {
    event.preventDefault()
    const name = email.split('@')[0].trim()
    if (!name) return
    localStorage.setItem('movie-library-user', name)
    setUser(name)
    setShowSignIn(false)
    setEmail('')
  }

  function signOut() {
    localStorage.removeItem('movie-library-user')
    setUser('')
  }

  return (
    <main>
      <header className="navbar">
        <a className="brand" href="#home" aria-label="Reel Good home">
          <span className="brand-mark" aria-hidden="true">m.</span>
          <span>live<span className="brand-light">movie</span></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a className={!showFavorites ? 'active' : ''} href="#collection" onClick={() => setShowFavorites(false)}>Discover</a>
          <button className={showFavorites ? 'active' : ''} type="button" onClick={() => setShowFavorites(true)}>
            Watchlist <span className="watchlist-count">{favorites.length}</span>
          </button>
        </nav>
        <div className="account-area">
          {user ? (
            <>
              <span className="user-greeting">Hi, {user}</span>
              <button className="sign-in-link" type="button" onClick={signOut}>Sign out</button>
            </>
          ) : (
            <button className="sign-in-button" type="button" onClick={() => setShowSignIn(true)}>
              Sign in <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT FAVORITE FILM</p>
          <h1>Here are some of the best<br />Cinematic Google Fonts options for Reelgood / Movie Streaming Website:<span>.</span></h1>
          <p className="hero-description">
            A little less scrolling, a lot more watching.<br className="desktop-break" />
            Find something wonderful for tonight.
          </p>
          <a className="button button-primary hero-cta" href="#collection">
            Explore the collection <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <img src={movies[0].poster} alt="" />
          <div className="hero-note"><span>TONIGHT'S PICK</span><strong>{movies[0].title}</strong><small>★ &nbsp;{movies[0].rating} / 10</small></div>
          <span className="hero-spark spark-one">✳</span>
          <span className="hero-spark spark-two">✦</span>
        </div>
        <div className="hero-bottom">
          <span>Curated for curious people</span>
          <span className="scroll-cue">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>
        </div>
      </section>

      <section className="collection section-wrap" id="collection">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> THE COLLECTION</p>
            <h2>{showFavorites ? 'Your watchlist' : 'Find your next favorite'}</h2>
          </div>
          <span className="film-count">{filteredMovies.length.toString().padStart(2, '0')} FILMS</span>
        </div>

        <div className="collection-tools">
     =
          <label className="search-box">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search films..."
              aria-label="Search films"
            />
            <kbd>↵</kbd>
          </label>
        </div>

        {filteredMovies.length ? (
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.includes(movie.id)}
                onFavorite={toggleFavorite}
                onSelect={setSelectedMovie}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">✳</span>
            <h3>{showFavorites ? 'Your watchlist is waiting.' : 'No films found.'}</h3>
            <p>{showFavorites ? 'Save a film you love and it’ll show up here.' : 'Try another title or choose a different genre.'}</p>
            {showFavorites && <button className="text-button" type="button" onClick={() => setShowFavorites(false)}>Explore all films →</button>}
          </div>
        )}
      </section>

      <footer className="footer">
        <a className="brand" href="#home"><span className="brand-mark" aria-hidden="true">m.</span><span>live<span className="brand-light">movie</span></span></a>
        <p>Good films. Good feelings. © 2024 Reelgood.</p>
        <a href="#home">Back to top ↑</a>
      </footer>

      <MovieDetails
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        isFavorite={selectedMovie ? favorites.includes(selectedMovie.id) : false}
        onFavorite={toggleFavorite}
      />

      {showSignIn && (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowSignIn(false)}>
          <section className="signin-modal" role="dialog" aria-modal="true" aria-labelledby="signin-title" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setShowSignIn(false)} aria-label="Close sign in">×</button>
            <span className="brand-mark" aria-hidden="true">r.</span>
            <p className="eyebrow">WELCOME TO REELGOOD</p>
            <h2 id="signin-title">Your movie night,<br />your way.</h2>
            <p>Sign in to keep your watchlist close. No password needed for this demo.</p>
            <form onSubmit={signIn}>
              <label htmlFor="signin-email">Email address</label>
              <input id="signin-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
              <button className="button button-primary" type="submit">Continue <span aria-hidden="true">→</span></button>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
