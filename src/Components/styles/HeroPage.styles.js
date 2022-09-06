import styled from "styled-components";

export const HeroDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url(images/food.jpg);
    background-size: cover;
    width: 100%;
    height: 100vh;
    
`;

export const NavDiv = styled.div`
    background-color: white;
    width: 100%;
    height: 70px;

`;

export const Button = styled.button`
    border-radius: 4px;
    font-size: 2rem;
    border: 1px solid black;
    padding: 5px 30px;
    color: black; 
    margin-top: 400px;
    background-color: white;
    &:hover {
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        transition: box-shadow 0.2s ease-in-out;
        
    }
`;