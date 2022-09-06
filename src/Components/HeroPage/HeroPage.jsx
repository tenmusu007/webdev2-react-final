import React from "react";
import { Link } from "react-router-dom";
import Nav from "../nav/Nav";
import { Button, HeroDiv, NavDiv } from "../styles/HeroPage.styles";



export default function HeroPage() {
	

	return (
        <HeroDiv>
            <Nav/>
            <Link to={"/Recipe"}>
            <Button>Enter</Button>
            </Link>

        </HeroDiv>

	);
}

