import { useEffect } from "react";

import {
    Button,
    Container
} from "react-bootstrap";

function NotLoggedIn({ navigate }) {

    useEffect(() => {

        const cleanup = () => {
            localStorage.clear("username");
            localStorage.clear("expiration");
            localStorage.clear("token");
            localStorage.clear("refresh");
        }

        cleanup();
    }, [])

    return (
        <Container className="notlogged">
            <h1>Not Logged In</h1>
            <div>
                <Button
                    onClick={() => navigate('/login')}>
                    Log In
                </Button>
            </div>
        </Container>
    )
}

export default NotLoggedIn;