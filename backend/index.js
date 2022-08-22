import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();
//const products = require("./products.json");
//import products from "./products.json";
const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
const { v4: uuid } = require("uuid");
const app = express();

const fs = require("fs");
let products = {};
fs.readFile("products.json", "utf-8", (err, data) => {
	if (err) throw err;

	products = JSON.parse(data);
});
//console.log(products);
//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
	res.send("IT WORKS AT BURADA");
});
app.get("/store-products", (req, res) => {
	try {
		return res.status(200).json(products);
	} catch (err) {
		return res.status(err.statusCode || 500).json(err.message);
	}
});
app.get("/store-single-product?id", (req, res) => {
	try {
		console.log(req);
		const singleProduct = products.filter((item) => item.id === req.query.id);
		return res.status(200).json(singleProduct);
	} catch (err) {
		return res.status(err.statusCode || 500).json(err.message);
	}
});

app.post("/stripe", async (req, res) => {
	try {
		const params = {
			submit_type: "pay",
			mode: "payment",
			payment_method_types: ["card"],
			billing_address_collection: "auto",
			shipping_options: [
				{ shipping_rate: "shr_1LCuU4JvkMUS48YInTC2kmdK" },
				{ shipping_rate: "shr_1LCuV9JvkMUS48YIguMYw7mU" },
			],

			line_items: req.body?.map((item) => {
				return {
					price_data: {
						currency: "usd",
						product_data: {
							name: item.name,
							images: [item.image],
						},
						unit_amount: item.price,
					},
					adjustable_quantity: {
						enabled: true,
						minimum: 1,
					},
					quantity: item.amount,
				};
			}),
			success_url: `${req.headers.origin}/success`,
			cancel_url: `${req.headers.origin}/canceled`,
		};

		// Create Checkout Sessions from body params.
		const session = await stripe.checkout.sessions.create(params);
		//console.log(session);
		return res.status(200).json(session);
	} catch (err) {
		console.log(err, "Hata");
		res.status(err.statusCode || 500).json(err.message);
	}
});
//listen
app.listen(5500, () => console.log("LISTENING AT PORT 5500"));
