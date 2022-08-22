import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cart_context";
const SuccessPage = () => {
	const { clearCart, removeStorage } = useCartContext();

	useEffect(() => {
		clearCart();
		removeStorage();
	}, []);
	return (
		<Wrapper className="page-100">
			<section>
				<h4>Thank you</h4>
				<h4>Your payment was successful!</h4>
				<p className="email-msg">Check your email inbox for the receipt.</p>
				<p className="description">
					If you have any questions, please email{" "}
					<a className="email" href="mailto:order@example.com">
						order@example.com
					</a>
				</p>
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

export default SuccessPage;
