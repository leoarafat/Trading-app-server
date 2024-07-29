// // server.js or app.js
// npm install stripe

// const express = require('express');
// const Stripe = require('stripe');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// const app = express();
// const stripe = Stripe('your_stripe_secret_key');

// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('your_mongo_connection_string', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const UserSchema = new mongoose.Schema({
//   email: String,
//   stripeCustomerId: String,
//   subscriptionStatus: String,
//   subscriptionStartDate: Date,
// });

// const User = mongoose.model('User', UserSchema);

// app.post('/register', async (req, res) => {
//   const { email, paymentMethodId } = req.body;

//   try {
//     const customer = await stripe.customers.create({
//       email,
//       payment_method: paymentMethodId,
//       invoice_settings: {
//         default_payment_method: paymentMethodId,
//       },
//     });

//     const user = new User({
//       email,
//       stripeCustomerId: customer.id,
//       subscriptionStatus: 'trial',
//       subscriptionStartDate: new Date(),
//     });

//     await user.save();

//     res.status(200).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// npm install @stripe/stripe-js @stripe/react-stripe-js

// // Register.js
// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe('your_stripe_publishable_key');

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     const { paymentMethod, error } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//       billing_details: {
//         email,
//       },
//     });

//     if (error) {
//       console.error(error);
//     } else {
//       const response = await fetch('/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           paymentMethodId: paymentMethod.id,
//         }),
//       });

//       const data = await response.json();
//       console.log(data);
//     }
//   };

//   return (
//     <Elements stripe={stripePromise}>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <CardElement />
//         <button type="submit" disabled={!stripe}>
//           Register
//         </button>
//       </form>
//     </Elements>
//   );
// };

// export default Register;

// const cron = require('node-cron');
// const stripe = require('stripe')('your_stripe_secret_key');

// // Check for subscriptions ending trial every day at midnight
// cron.schedule('0 0 * * *', async () => {
//   const users = await User.find({ subscriptionStatus: 'trial' });

//   users.forEach(async (user) => {
//     const daysSinceSubscriptionStart = Math.floor((new Date() - new Date(user.subscriptionStartDate)) / (1000 * 60 * 60 * 24));

//     if (daysSinceSubscriptionStart >= 7) {
//       try {
//         // Create a subscription
//         await stripe.subscriptions.create({
//           customer: user.stripeCustomerId,
//           items: [{ price: 'your_stripe_price_id' }], // Price ID for $19.99 monthly subscription
//           expand: ['latest_invoice.payment_intent'],
//         });

//         user.subscriptionStatus = 'active';
//         await user.save();
//       } catch (error) {
//         console.error(`Failed to create subscription for user ${user.email}: ${error.message}`);
//       }
//     }
//   });
// });

// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'your_email_service',
//   auth: {
//     user: 'your_email',
//     pass: 'your_email_password',
//   },
// });

// // Send email notification when subscription trial is ending
// cron.schedule('0 0 * * *', async () => {
//   const users = await User.find({ subscriptionStatus: 'trial' });

//   users.forEach(async (user) => {
//     const daysSinceSubscriptionStart = Math.floor((new Date() - new Date(user.subscriptionStartDate)) / (1000 * 60 * 60 * 24));

//     if (daysSinceSubscriptionStart === 6) {
//       const mailOptions = {
//         from: 'your_email',
//         to: user.email,
//         subject: 'Your free trial is ending soon',
//         text: 'Your free trial will end tomorrow. Your account will be automatically charged $19.99.',
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error(`Failed to send email to ${user.email}: ${error.message}`);
//         } else {
//           console.log(`Email sent to ${user.email}: ${info.response}`);
//         }
//       });
//     }
//   });
// });
