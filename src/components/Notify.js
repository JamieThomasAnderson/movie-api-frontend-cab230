import { Container } from "react-bootstrap";
import { Alert } from "reactstrap";

function Notify({ prompt, color }) {
    return (
        <Container>
            {prompt && <Alert id="alert" color={color}>{prompt}</Alert>}
        </Container>
    )
}

export default Notify;