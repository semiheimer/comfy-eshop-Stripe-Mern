import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
	Home,
	Products,
	SingleProduct,
	About,
	Error,
	Cart,
	Checkout,
	Private,
	AuthWrapper,
	Success,
  Canceled,
} from "./pages";

function App() {
	return (
		<AuthWrapper>
			<Router>
				<Navbar />
				<Sidebar />
				<Routes>
					<Route path="/" element={<Home></Home>} />
					<Route path="/about" element={<About />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/products" element={<Products/>} />
					<Route path="/success" element={<Success/>} />
          <Route path="/canceled" element={<Canceled/>} />
					<Route
						path="/checkout"
						element={
							<Private>
								<Checkout />
							</Private>
						}
					/>
					<Route path="/products/:id/" element={<SingleProduct />} />
					<Route path="*" element={<Error />} />
				</Routes>
				<Footer />
			</Router>
		</AuthWrapper>
	);
}

export default App;
