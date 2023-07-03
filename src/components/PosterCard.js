import {
    Card
} from "reactstrap";

function PosterCard({ poster }) {
    return (
        <Card
            style={{
                padding: '20px',
                width: '22rem',
                height: '30.5rem',
                borderRadius: '0%',
                backgroundColor: '#eaeff2'
            }}>
            <img
                style={{
                    borderRadius: '2%',
                    border: "0.5px solid grey",
                    width: "100%",
                    height: "100%"
                }}
                className=".poster"
                alt="Poster"
                src={poster} />

        </Card>

    )
}

export default PosterCard;