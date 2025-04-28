const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(functions.config().stripe.secret_key);

admin.initializeApp();

// - APP Config
const app = express();

// - Middlewares
app.use(cors());
app.use(express.json());

// - APP ROUTES
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/payments/create", async (req, res) => {
  const { amount } = req.body;

  console.log(`Payment request received: ${amount}`);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // $20.00 in cents
      currency: "usd",
    });
    // If intent is okay
    res.status(201).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("-----------------------------");
    console.error("Error creating payment intent:", error);
    res.status(500).send("Internal Server Error");
    console.log("-----------------------------");
  }
});

// - Listen Commands
exports.api = functions.https.onRequest(app);
