import {
  useState,
  useEffect
} from 'react';

import { useNavigate } from 'react-router';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

import { Row } from 'reactstrap';
import { Container } from 'react-bootstrap';

import SearchBar from '../components/SearchBar';
import Notify from '../components/Notify';

import { INFINITE_SCROLL } from '../helpers/configuration';
import { API_URL } from '../helpers/configuration';
import { API_LIMIT } from '../helpers/configuration';


function Search() {

  const navigate = useNavigate();

  // Search Input
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');

  // Error Handling
  const [error, setError] = useState('');
  const [rateLimit, setRateLimit] = useState(0);

  // Refresh On Query Change
  const [refresh, setRefresh] = useState(true)

  const paginationPageSize = 100;

  // Define Datasource for Infinite Scrolling Grid
  const dataSource = {
    getRows: (params) => {
      let pageNo = params.endRow / paginationPageSize;
      const url = `${API_URL}/movies/search?title=${query}&year=${year}&page=${pageNo}`;
      fetch(url)
        .then((res) => {

          // Rate Limiting
          if (res.status === 429) {
            setRateLimit(res.headers.get('RateLimit-Reset'));
            throw new Error(API_LIMIT)
          }
          return res.json()
        })
        .then((data) => {

          // Valid Fetch => Successful Callback
          params.successCallback(data.data, data.pagination.total);

        })
        .catch((error) => {
          if (error.message === API_LIMIT) { setError(API_LIMIT) }
          console.error(error);

        });
    },
  };

  // Countdown Rate Limit Timer.
  useEffect(() => {
    const timer = setInterval(() => {
      setRateLimit(rateLimit => rateLimit - 1);
      if (rateLimit === 1) { setError(''); setRateLimit(0) }
    }, 1000);
    return () => clearInterval(timer);
  }, [rateLimit]);



  return (

    <Container>

      <div className='rateLimitDiv'>
        <Notify
          prompt={error}
          color={'danger'} />

        {error && rateLimit > 0 && (
          <h1 className='rateLimited'>
            Try again in {rateLimit} seconds.
          </h1>
        )}

      </div>

      {!error &&
        <SearchBar
          year={year}
          query={query}
          setRefresh={setRefresh}
          setQuery={setQuery}
          setYear={setYear} />}

      {!error && <Row className='justify-content-md-center'>
        <div
          className='ag-theme-alpine'
          style={{
            height: '500px',
            width: '94%',
            fontFamily: 'monospace'
          }}>

          {refresh && <AgGridReact
            columnDefs={INFINITE_SCROLL}
            rowModelType='infinite'
            rowHeight={30}
            maxConcurrentDatasourceRequests={1}
            onGridReady={(params) => { params.api.setDatasource(dataSource) }}
            onRowClicked={(row) =>
              navigate(`/movie?imdbID=${row.data.imdbID}`)} />}

          {!refresh && <AgGridReact
            columnDefs={INFINITE_SCROLL}
            rowModelType='infinite'
            rowHeight={30}
            maxConcurrentDatasourceRequests={1}
            onGridReady={(params) => { params.api.setDatasource(dataSource) }}
            onRowClicked={(row) =>
              navigate(`/movie?imdbID=${row.data.imdbID}`)} />}

        </div>
      </Row>}
    </Container>

  )
}

export default Search;