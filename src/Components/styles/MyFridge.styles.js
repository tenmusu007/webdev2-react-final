import styled from "styled-components";

export const Fridge = styled.div`
    margin-top:70px;
    margin-left:5px;
    padding: 10px;
    max-width: 250px;
    width: 250px;
    border-radius: 10px;
    border: 2px solid black;
    min-height: 200px;
`;

export const ListName = styled.h2`
    font-size: 1.5em;
    color: black;
    text-align: center;
    padding: 10px;
`;

export const Search = styled.input`
    border-radius: 4px;
    border: 1px solid black;
    padding: 5px;
    width: 170px;
    color: black;
    ::placeholder {
        color: gray;
    }
`;

export const Add = styled.input`
    border-radius: 4px;
    border: 1px solid black;
    padding: 5px;
    color: black; 
    width: 20%;  
    margin-left : 10px;
    &:hover {
        cursor: pointer;
    }
`;

export const WhisperUl = styled.ul`
    position: absolute;
    background-color: white;
    border-radius: 4px;
    border : ${props => props.b}px solid black;
    width: 170px;
    padding: 3px;
`;

export const WhisperDiv = styled.div`
    &:hover {
        background-color: lightgray;
        cursor: pointer; 
    }
`;

export const ListDiv = styled.div`
    padding-top: 10px;
`;

export const IngredientDiv = styled.div`
    padding-bottom: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const IngredientImg = styled.img`
    width: 15%;
    height: 15%;
    margin-right: 3px;
`;

export const IngredientName = styled.span`
    font-size: 1.2em;
`;

export const RemoveBtn = styled.button`
    border-radius: 4px;
    border: 1px solid black;
    padding: 5px;
    color: black; 
    &:hover {
        cursor: pointer;
    }

`;


