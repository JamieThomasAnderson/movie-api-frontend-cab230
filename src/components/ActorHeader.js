import {
    Row,
    Col,
    Button
} from "reactstrap";

function ActorTitle({ name, yearsActive, setYearsActive, navigate }) {

    if (yearsActive === null) { setYearsActive("") }

    return (
        <Row className="actorTitle">
            <Col className="naviagteBack" xs="auto">
                <Button
                    color='primary'
                    id='movieBackButton'
                    onClick={() => navigate(-1)}>
                    ⇽ Back
                </Button>
            </Col>

            <Col xs="auto">
                <h1>{name}</h1>
            </Col>
            <Col id="yearTitle" xs="auto">
                <h3>{yearsActive}</h3>
            </Col>
        </Row>
    )
}

export default ActorTitle;