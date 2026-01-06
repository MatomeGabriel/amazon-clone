
# Amazon Clone 🛒

An Amazon-like e-commerce web application featuring user authentication, product browsing, shopping cart functionality, and payment processing using **React**, **Firebase**, and **Stripe**.

---

## 🚀 Features
- **User Authentication**: Sign-up, log-in, and log-out using Firebase Authentication.  
  ![Sign-In Page](<img width="1919" height="1009" alt="Signin" src="https://github.com/user-attachments/assets/8cd4fb6d-e220-45ba-9f9f-8422e016b871" />
)  
  ![Sign-Up Page](<img width="1914" height="1005" alt="create account" src="https://github.com/user-attachments/assets/d9ceea2a-0adb-41c5-b0df-ab524eb27739" />
)

- **Product Browsing**: View products fetched in real-time from DummyJSON.  
  ![Home Page](<img width="1917" height="988" alt="Page 1" src="https://github.com/user-attachments/assets/8093cdc5-a662-4686-aeba-d62b32b11e12" />
)  
  ![Products Page](<img width="1919" height="1006" alt="Produycts page" src="https://github.com/user-attachments/assets/50d78f2c-f8a4-407a-b194-00b964644d6e" />
)

- **Shopping Cart**: Add/remove products to/from the cart.  
  ![Cart Page](<img width="1919" height="1002" alt="Cart page" src="https://github.com/user-attachments/assets/e6462d02-5716-47db-a360-372530e41709" />
)

- **Secure Payment Processing**: Integrated with Stripe API.  
  ![Checkout Page](<img width="1919" height="571" alt="checkout" src="https://github.com/user-attachments/assets/2b63e63d-3782-4b8a-b1c5-56d86bb6dbea" />
)

- **Order Tracking** *(Feature to add)*

---

## 🛠 Tech Stack

### **Frontend**
- React with Hooks and Context API for state management.
- React Router for routing.  
  ![Home Page with Products Added](<img width="1917" height="988" alt="Page 1" src="https://github.com/user-attachments/assets/2be150c7-8c8c-4c28-98b0-6ac5e694a758" />
)

### **Backend**
- Firebase Firestore for storing user and order data.
- Firebase Functions for backend logic (e.g., Stripe payment intent creation).
- Stripe API for secure payment processing.

### **Deployment**
- **Vercel** (or your chosen platform) for frontend.
- Firebase Functions for backend API.

---

## 🔧 Setup and Installation

Clone the repository:
```bash
git clone https://github.com/MatomeGabriel/amazon-clone.git
cd amazon-clone
