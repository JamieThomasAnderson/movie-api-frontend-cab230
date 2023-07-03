import {
    useSearchParams,
    useNavigate
} from 'react-router-dom';

import {
    useState,
    useEffect,
    useRef
} from 'react';
import { AgGridReact } from 'ag-grid-react';

import {
    Row,
    Container,
    Card
} from 'react-bootstrap';

import {
    INVALID_REQUEST,
    INVALID_PAGE,
    TOKEN_EXPIRED,
    API_URL,
    API_LIMIT,
    ACTOR_TABLE
} from '../helpers/configuration';

import { getData } from '../helpers/getData';
import { checkToken } from '../helpers/checkToken';

import Histogram from '../components/Graph';
import ActorTitle from '../components/ActorHeader';
import NotLoggedIn from '../components/NotLoggedIn';
import Notify from '../components/Notify';


function ActorTable({ navigate, rowData }) {
    return (
        <Row className='justify-content-md-center'>
            <div
                className='ag-theme-alpine'
                style={{
                    height: '500px',
                    width: '86.8%',
                    fontFamily: 'monospace'
                }}>

                <AgGridReact
                    columnDefs={ACTOR_TABLE.columns}
                    rowData={rowData}
                    paginationPageSize={10}
                    rowHeight={50}
                    pagination={true}
                    onRowClicked={(row) => navigate(`/movie?imdbID=${row.data.movieId}`)} />
            </div>
        </Row>
    )
}


function Actor() {

    const navigate = useNavigate();

    // Token Handling
    const [tokenValid, setTokenValid] = useState(true);
    const [rToken, setRefreshToken] = useState(null);
    const hasCheckedrToken = useRef(false);

    // Data
    const [name, setName] = useState('');
    const [yearsActive, setYearsActive] = useState('');
    const [ratings, setRatings] = useState([]);
    const [rowData, setRowData] = useState([]);

    // Get Actor ID 
    const [searchParams] = useSearchParams();
    const actorID = searchParams.get('actorID');

    // Error Handling
    const [refreshError, setRefreshError] = useState('');
    const [fetchError, setFetchError] = useState('');


    // Handle Token Refresh
    const refreshToken = () => {
        const url = `${API_URL}/user/refresh`;
        const refresh = localStorage.getItem('refresh')

        if (refresh === null) { return; }

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            // Send POST Body with Refreshtoken
            body: JSON.stringify({ refreshToken: refresh }),

        })

            // Catch Errors
            .then((res) => {
                if (res.status === 400) { throw new Error(INVALID_REQUEST) }
                if (res.status === 401) { throw new Error(TOKEN_EXPIRED) }
                if (res.status === 429) { throw new Error(API_LIMIT) }
                return res.json();
            })
            .then((res) => {
                // Set Tokens
                localStorage.setItem('token', res.bearerToken.token);
                localStorage.setItem('refresh', res.refreshToken.token);

                // Calculate Unix Time for Token Expiration
                localStorage.setItem('expiration', Date.now() + res.bearerToken.expires_in * 1000);
                localStorage.setItem('refresh_expiration', Date.now() + res.refreshToken.expires_in * 1000);

                // Set rToken for Re-render, hasChecked... to Prevent Multiple POSTs
                setRefreshToken(res.refreshToken.token);
                hasCheckedrToken.current = false;
                setRefreshError('')
            })

            .catch((error) => {

                // Error Handling
                if (error.message === INVALID_REQUEST) { setRefreshError(INVALID_REQUEST) }
                if (error.message === TOKEN_EXPIRED) { setRefreshError(TOKEN_EXPIRED) }
                if (error.message === API_LIMIT) { setRefreshError(API_LIMIT) }
                else { setRefreshError(error.message) }
            });
    };


    // On Page Enter, Check for Valid refresh Token
    useEffect(() => {

        const checkRefreshToken = () => {

            const refreshToken = localStorage.getItem('refresh');
            const refreshExpiration = localStorage.getItem('refresh_expiration');

            if (refreshToken === null || Date.now() >= refreshExpiration) {
                setTokenValid(false); // -> Render NotLoggedIn Component
                return;
            } else {
                setTokenValid(true); // -> Render Normal Page
                return;
            }
        };

        checkRefreshToken();
        getData(setRatings, rowData);
    }, [rowData]);


    // Populate Page
    useEffect(() => {
        const fetchActor = () => {
            const url = `${API_URL}/people/${actorID}`;
            const token = localStorage.getItem('token')

            // Check if Bearer Token is Valid, If Not - Refresh
            if (!checkToken()) {
                refreshToken();
                return;
            }

            return fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then((res) => {
                    if (res.status === 400) { throw new Error(INVALID_REQUEST) }
                    if (res.status === 401) { throw new Error(TOKEN_EXPIRED) }
                    if (res.status === 404) { throw new Error(INVALID_PAGE) }
                    if (res.status === 429) { throw new Error(API_LIMIT) }
                    setFetchError('')
                    return res.json();
                })
                .then((res) => {
                    setName(res.name);
                    if (res.deathYear === null) { setYearsActive(res.birthYear + ' - Present') } else {
                        setYearsActive(res.birthYear + ' - ' + res.deathYear)
                    }
                    setRowData((res.roles).map(roles => {
                        return {
                            movieName: roles.movieName,
                            movieId: roles.movieId,
                            category: roles.category.toUpperCase(),
                            roles: (roles.characters).join(' '),
                            imdbRating: roles.imdbRating
                        }
                    }))
                })
                .catch((error) => {
                    if (error.message === INVALID_REQUEST) { setFetchError(INVALID_REQUEST) }
                    if (error.message === TOKEN_EXPIRED) { setFetchError(TOKEN_EXPIRED) }
                    if (error.message === INVALID_PAGE) { setFetchError(INVALID_PAGE) }
                    if (error.message === API_LIMIT) { setFetchError(API_LIMIT) }
                    else { setFetchError(error.message) }
                });
        };

        // Prevent UseEffect from Triggering Twice (Pevents Error in Console)
        if (hasCheckedrToken.current === false) {
            fetchActor();
            hasCheckedrToken.current = true;
        }
    }, [actorID, rToken]); // rToken Dependency Ensures Data Refresh on New Token


    return (tokenValid ? (
        <Container>

            <ActorTitle
                name={name}
                yearsActive={yearsActive}
                setYearsActive={setYearsActive}
                navigate={navigate} />

            <Notify prompt={fetchError} color={'danger'} />
            <Notify prompt={refreshError} color={'danger'} />

            <ActorTable
                navigate={navigate}
                rowData={rowData} />

            <h1 id='imdbTitle'>IMDB Ratings At a Glance</h1>

            <Card>
                <Histogram
                    id='graph'
                    data={ratings}
                    width={1000}
                    height={300} />
            </Card>


        </Container>
    ) : (<NotLoggedIn navigate={navigate} />))
}

export default Actor;