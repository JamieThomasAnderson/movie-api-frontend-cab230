import { Badge } from "reactstrap";

function GenreBadge({ genres }) {
    return genres.map((genre, index) => {
        let color = '';
        switch (genre) {
            case 'Action':
                color = 'primary';
                break;
            case 'Comedy':
                color = 'success';
                break;
            case 'Drama':
                color = 'warning';
                break;
            case 'Horror':
                color = 'dark';
                break;
            case 'Fantasy':
                color = 'info';
                break;
            case 'Adventure':
                color = 'danger';
                break;
            case 'Animation':
                color = 'info';
                break;
            case 'Thriller':
                color = 'danger';
                break;
            case 'Sport':
                color = 'primary';
                break;
            case 'Biography':
                color = 'dark';
                break;
            case 'Family':
                color = 'warning';
                break;
            case 'Crime':
                color = 'danger';
                break;
            default:
                color = 'secondary';
                break;
        }
        return (
            <Badge
                key={index}
                color={color}
                style={{ padding: "10px", fontFamily: "Oswald", fontSize: "20px" }}>
                {genre}
            </Badge>
        );
    });
}

export default GenreBadge;