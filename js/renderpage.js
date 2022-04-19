const API_KEY = '8e780e2096199d1600eb05d0abc26d48'
const API_BASE = 'https://api.themoviedb.org/3'
let movies = []

//getting page elements
const titleMovie = document.querySelector('.main-movie-title')
const movieDescription = document.querySelector('.main-movie-description')
const movieImage = document.querySelector('.film-background')
const age = document.querySelector('.age')
const moviesSection = document.querySelector('.movies-section')

const getHomeListMovies = async (endpoint) => {
    const res = await fetch(`${API_BASE}${endpoint}&api_key=${API_KEY}`).then(films => films.json())
    return res
}

movies = [
    {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: getHomeListMovies('/discover/tv?with_network=213&language=pt-BR')
    },
    {
        slug: 'trending',
        title: 'Recomendados para você',
        items:  getHomeListMovies('/trending/all/week?language=pt-BR')
    },
    {
        slug: 'toprated',
        title: 'Em alta',
        items:  getHomeListMovies('/movie/top_rated?language=pt-BR')
    },
    {
        slug: 'action',
        title: 'Ação',
        items:  getHomeListMovies('/discover/movie?with_genres=28&language=pt-BR')
    },
    {
        slug: 'comedy',
        title: 'Comédia',
        items:  getHomeListMovies('/discover/movie?with_genres=35&language=pt-BR')
    },
    {
        slug: 'horror',
        title: 'Terror',
        items:  getHomeListMovies('/discover/movie?with_genres=27&language=pt-BR')
    },
    {
        slug: 'romance',
        title: 'Romance',
        items:  getHomeListMovies('/discover/movie?with_genres=10749&language=pt-BR')
    },
    {
        slug: 'documentary',
        title: 'Documentário',
        items:  getHomeListMovies('/discover/movie?with_genres=99&language=pt-BR')
    },
    {
        slug: 'fantasy',
        title: 'Fantasia',
        items:  getHomeListMovies('/discover/movie?with_genres=14&language=pt-BR')
    },
    {
        slug: 'animation',
        title: 'Animação',
        items:  getHomeListMovies('/discover/movie?with_genres=16&language=pt-BR')
    },
    {
        slug: 'science-fiction',
        title: 'Ficção Científica',
        items:  getHomeListMovies('/discover/movie?with_genres=878&language=pt-BR')
    }
]

function createPage(movies) {
    movies.forEach(movie => {
        const movieCarousel = document.createElement('div')
        const movieRow = document.createElement('div')
        const sectionTitle = document.createElement('h3')
        const pElement = document.createElement('p')
        const iconElement = document.createElement('i')
        const arrowLeft = document.createElement('button')
        const arrowRight = document.createElement('button')
        const iconPrev = document.createElement('i')
        const iconNext = document.createElement('i')

        arrowLeft.classList.add('prev')
        arrowRight.classList.add('next')
        iconPrev.classList.add('fa-solid', 'fa-angle-left')
        iconNext.classList.add('fa-solid', 'fa-angle-right')

        arrowLeft.appendChild(iconPrev)
        arrowRight.appendChild(iconNext)

        iconElement.classList.add('fa-solid', 'fa-angle-right')
        pElement.innerHTML = 'Ver tudo'
        pElement.classList.add('see-all')
        movieCarousel.classList.add('movie-carousel','glider-contain')
        movieRow.classList.add ('movie-row','glider')
        sectionTitle.classList.add ('section-title')
        sectionTitle.innerHTML = movie.title
        movieCarousel.appendChild(arrowLeft)
        movieCarousel.appendChild(arrowRight)
        pElement.appendChild(iconElement)
        sectionTitle.appendChild(pElement)
        movieCarousel.appendChild(sectionTitle)
        movieCarousel.appendChild(movieRow)
        moviesSection.appendChild(movieCarousel)

        movie.items.then(res => {
            res.results.map(item => {
                const movieItem = document.createElement('div')
                const movieImage = document.createElement('img')
                movieItem.classList.add('item')
                movieImage.src = `https://image.tmdb.org/t/p/original${item.poster_path}`
                movieImage.classList.add('movie-box')
                movieItem.appendChild(movieImage)
                movieRow.appendChild(movieItem)
            })
        })
    })
}


createPage(movies)


function createCarousel() {
    const gliders = document.querySelectorAll('.glider')

    setTimeout(() => {
        gliders.forEach(glider => {
            new Glider(glider , {
                slidesToShow: 'auto',
                slidesToScroll: 'auto',
                draggable: true,
                itemWidth: 340,
                arrows: {
                    prev: '.prev',
                    next: '.next'
                }
            })
        })
    },2000)
}


createCarousel()


async function fetchData (endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}&api_key=${API_KEY}`).then(films => films.json())
  return res
}

window.onload =  async function getPopularMovie() {
    const res = await fetch(`${API_BASE}/movie/popular?language=pt-BR&api_key=${API_KEY}`).then(films => films.json())
    titleMovie.innerHTML = res.results[0].title
    movieDescription.innerHTML = res.results[0].overview
    movieImage.src= `https://image.tmdb.org/t/p/original${res.results[0].backdrop_path}`

    if(res.results[0].adult === true) {
        age.innerHTML = '18'
        age.style.backgroundColor = '#E50914'
    } else {
        age.innerHTML = '12'
        age.style.backgroundColor = 'yellow'
    }
}

