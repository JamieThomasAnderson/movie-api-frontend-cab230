import { // REACSTRAP
    Button,
    InputGroup,
    Input,
} from 'reactstrap';

import YearDropdown from './YearDropdown'; // COMPONENTS

function SearchBar({ year, query, setRefresh, setQuery, setYear }) {

    const reset = () => {
        setRefresh(prevState => !prevState)
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            reset()
        }
    };

    return (
        <InputGroup className='search'>

            <YearDropdown
                year={year}
                setYear={setYear} />

            <Input
                type='text'
                placeholder='Movie Title'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress} />

            <Button
                className='searchButton'
                onClick={() => { reset() }}>
                Search
            </Button>

        </InputGroup>
    )

}

export default SearchBar;