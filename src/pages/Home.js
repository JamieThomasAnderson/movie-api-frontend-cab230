import React from "react";
import { LinkContainer } from 'react-router-bootstrap'


export default function Home() {
    return (
        <Hero />
    )
}

const Hero = () => (
    <section className="hero">
        <h1 className="hero__title">Film DB</h1>
        <LinkContainer to="/search">
            <div className="hero__button"><button type="button" className="btn btn-light">Explore Now</button></div>
        </LinkContainer>
        <h3 className="hero__subtitle">All Your favourite Movies</h3>
    </section>
);