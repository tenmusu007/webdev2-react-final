import styled from "styled-components";

export const All_part_u = styled.div`
  display: flex;
  flex: 1 1;
  text-align: center;
  margin: 1%;
`;

export const All_div = styled.div`
  text-align: center;
  margin: 1%;
`;
export const Search_bar = styled.input`
  width: 50%;
  border: 3px solid #2d2e2e;
  padding: 1rem;
  height: 1rem;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9dbfaf;
`;

export const Check_boxes = styled.input`
    background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  transform: translateY(-0.075em);
  margin: 0.2%;
`

export const Labels = styled.label`
    margin-right: 0.5%;
`

export const Cards = styled.div`
    display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin: 1%;
`

export const Card = styled.div`
  background-color: white;
  border-style: solid;
  border-radius: 25px;
  max-width: 18rem;
  height: auto;
  padding: 2%;
  text-align: center;
  margin: 1%;
`

export const Recipe_imgs = styled.img`
  margin-top: 3%;
  border-radius: 10px;
  margin-bottom: 2%;
  max-width: 90%;
  transition: transform .2s;
  &:hover {
    -ms-transform: scale(1.1); /* IE 9 */
  -webkit-transform: scale(1.1); /* Safari 3-8 */
  transform: scale(1.1); 
  }
`

export const Card_buttons = styled.button`
  background-color: grey; /* Green */
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  margin: 0 5% 0 5%;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px; 
  &:hover {
    background-color: rgb(176, 175, 175);
  color: grey;
  }
`

export const Right_part_u = styled.div`
  background-color: white;
  border-style: solid;
  border-radius: 25px;
  max-width: 20%;
  height: auto;
  padding: 2%;
  margin-top: 7.8%;
`

export const Recipes_list = styled.li`
  display: flex;
    padding: 0.5% 0 0.5% 0;
    margin-top: 5%;
`

export const Del_btn = styled.button`
  cursor: pointer;
    margin-left: 1%;
`

export const Right_part_uu = styled.div`
    width: 200px;
   max-width: 200px;
   text-align: left;
`
