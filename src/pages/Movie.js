import {
    AgGridReact
} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

import {
    useState,
    useEffect
} from 'react';
import {
    useSearchParams,
    useNavigate,
    Link
} from 'react-router-dom';

import {
    Button,
    Row,
    Container
} from 'reactstrap';

import MovieHeader from '../components/MovieHeader';
import PosterCard from '../components/PosterCard';
import RatingsFooter from '../components/RatingsFooter';
import Notify from '../components/Notify';

import { API_URL } from '../helpers/configuration';
import { INVALID } from '../helpers/configuration';
import { MOVIE_TABLE } from '../helpers/configuration';

// Render Errror Alerts
function FetchError({ error }) {
    return (
        <Container className='movieError'>
            <Notify
                prompt={error}
                color={"danger"} />
            <Link to='/search'>
                <div className='movieErrorButton'>
                    <Button
                        id='movieBackButton'
                        color='success'>
                        ← Search
                </Button>
                </div>
            </Link>
        </Container>
    )
}

// AG Grid Component
function MovieDisplay({ rowData, navigate, poster }) {

    return (
        <Row className='justify-content-md-right'>
            <div
                className='ag-theme-alpine'
                style={{
                    height: '500px',
                    width: '72%',
                    fontFamily: 'monospace'
                }}>

                <AgGridReact
                    columnDefs={MOVIE_TABLE.columns}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={10}
                    suppressPaginationPanel={true}
                    rowHeight={50}
                    onRowClicked={(row) =>
                        navigate(`/actor?actorID=${row.data.id}`)}
                />

            </div>
            <PosterCard
                poster={poster} />
        </Row>
    )
}


function Movie() {

    const navigate = useNavigate();

    // Data
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [runtime, setRuntime] = useState(0);
    const [genres, setGenres] = useState([]);
    const [country, setCountry] = useState('');
    const [plot, setPlot] = useState('');
    const [ratings, setRatings] = useState([
        {
            'source': 'Internet Movie Database',
            'value': 0
        },
        {
            'source': 'Rotten Tomatoes',
            'value': 0
        },
        {
            'source': 'Metacritic',
            'value': 0
        }
    ]);
    const [poster, setPoster] = useState('');
    const [boxOffice, setBoxOffice] = useState(0);
    const [rowData, setRowData] = useState([]);

    // Get IMDB ID from React Router
    const [searchParams] = useSearchParams();
    const imdbID = searchParams.get('imdbID');

    // Error Handling
    const [error, setError] = useState('');

    // Fetch Data on Page Load
    useEffect(() => {

        const fetchData = () => {
            fetch(`${API_URL}/movies/data/${imdbID}`)
                .then(res => {

                    // All errors effectively the same from the user perspective -- for this endpoint
                    if (res.status === 404 || res.status === 400 || res.status === 429) {
                        throw new Error(INVALID);
                    }

                    return res.json();

                })

                // Set Data
                .then(data => {
                    setTitle(data.title);
                    setYear(data.year);
                    setRuntime(data.runtime);
                    setGenres(data.genres);
                    setCountry(data.country);
                    setPlot(data.plot);
                    setPoster(data.poster);
                    setBoxOffice(data.boxoffice);
                    setRatings(data.ratings.map(rating => {
                        return {
                            source: rating.source,
                            rating: rating.value,
                        }
                    }));
                    setRowData(data.principals.map(principal => {
                        return {
                            id: principal.id,
                            name: principal.name,
                            role: (principal.category).toUpperCase().replace('_', ' '),
                            characters: principal.characters
                        }
                    }))
                })

                // Error Handling
                .catch(error => {
                    if (error.message === (INVALID)) { setError(INVALID) }
                    else { setError(error.message) }
                })
        };

        fetchData();

    }, [imdbID]);

    // Render FetchError Component if Invalid
    if (error !== INVALID) {

        return (
            <Container>

                <MovieHeader
                    title={title}
                    year={year}
                    runtime={runtime}
                    plot={plot}
                    genres={genres}
                    country={country}
                    boxOffice={boxOffice}
                    navigate={navigate} />

                <MovieDisplay
                    rowData={rowData}
                    navigate={navigate}
                    poster={poster} />


                <RatingsFooter
                    ratings={ratings} />


            </Container>
        )
    } else {
        return (
            <FetchError error={error} />
        )
    }
}


export default Movie;