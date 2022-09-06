import styled from "styled-components";
  export const ShoppingStyled = styled.section`
		.container {
			margin-top: 20px;

			.recipeHeader {
				display: flex;
				align-items: center;
				.btn {
					margin-left: 20px;
				}
			}
			.imgConatiner {
				width: 200px;
				margin: 20px auto;
				.recipeImag {
					width: 200px;
					/* margin-left: 20px; */
				}
			}
			.step {
				margin: 20px;
			}
			.recipeTxtContainer {
				/* display: flex;
         */
				margin: 20px;
				/* align-items: center; */
			}
			.recipe {
				display: flex;

				.aisle {
					align-items: center;
					display: flex;
				}
				.ingImg {
					margin-left: 20px;
					width: 30px;
					height: auto;
				}
			}
			.text {
				margin: 10px 10px 10px 20px;
			}
		}
	`;