import {
    Col,
    Row
} from "reactstrap"

function RatingsFooter({ ratings }) {

    let IMDB = ratings[0].rating;
    let ROTTEN_TOMATOES = ratings[1].rating;
    let METACRITIC = ratings[2].rating;

    if (ROTTEN_TOMATOES === 0) { ROTTEN_TOMATOES = null }


    return (
        // Only Render Ratings if != Null
        <div id='ratings'>
            <Row className='justify-content-md-left'>

                <Col className='' xs='3'>
                    {IMDB &&
                        <h4>IMDB: {IMDB}/10</h4>}
                </Col>

                <Col className='' xs='3'>
                    {ROTTEN_TOMATOES &&
                        <h4>rottenTomatoes: {ROTTEN_TOMATOES}%</h4>}
                </Col>

                <Col className='' xs='3'>
                    {METACRITIC &&
                        <h4>Metacritic: {METACRITIC}/100</h4>}
                </Col>


            </Row>
        </div>
    )
}

export default RatingsFooter;