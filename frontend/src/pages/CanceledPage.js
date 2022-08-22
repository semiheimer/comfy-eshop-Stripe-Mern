
import styled from "styled-components";
import { Link } from "react-router-dom";

const CanceledPage = () => {

	return (
		<Wrapper className="page-100">
			<section>
				<h4>Thank you</h4>
				<h4>Something Went Wrong!</h4>
				
				<Link to="/" className="btn">
					Continue Shopping
				</Link>
			</section>
		</Wrapper>
	);
};
const Wrapper = styled.main`
	background: var(--clr-primary-10);
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	h1 {
		font-size: 10rem;
	}
	h3 {
		text-transform: none;
		margin-bottom: 2rem;
	}
`;

export default CanceledPage;
