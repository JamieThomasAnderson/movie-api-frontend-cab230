import { Link } from "react-router-dom";

import {
    Col,
    Row,
    Button
} from "reactstrap";

import GenreBadge from "./GenreBadge";

function MovieHeader({ title, year, runtime, plot, genres,
    country, boxOffice, navigate }) {

    // Not Rendering Box Office if BoxOffice is 0
    if (boxOffice === 0) { boxOffice = null }

    return (
        <div>
            <Row className='movieTitle'>

                <Col xs='auto'>
                    <Link to="/search">
                        <Button
                            color='primary'
                            id='movieBackButton'
                            onClick={() => navigate('/search')}>
                            ⇽ Search
                        </Button>
                    </Link>
                </Col>

                <Col xs='auto'>
                    <h1>
                        {title}
                    </h1>
                </Col>

                <Col xs='auto'>
                    <h3 id="yearTitle">
                        {year}
                    </h3>
                </Col>

                <Col xs='auto'>
                    <h3 id="runtimeTitle">
                        {runtime} minutes
                    </h3>
                </Col>
            </Row>

            <h5 id="moviePlot">{plot}</h5>

            <GenreBadge
                genres={genres} />

            <div className='subtitleData'>
                <Row>
                    <Col className='' xs='3'>
                        <h4>Country: {country}</h4>
                    </Col>

                    <Col className='' xs='3'>

                        {/* Do not Render BoxOffice if Null */}
                        {boxOffice && <h4>Box Office: ${boxOffice}.00 USD</h4>}
                    </Col>
                </Row>
            </div>
        </div>


    )
}

export default MovieHeader;