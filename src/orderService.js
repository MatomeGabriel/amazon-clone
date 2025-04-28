import { db } from "./firebase";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const saveOrder = async (userId, cartItems, totalAmount) => {
  const orderRef = collection(db, "users", userId, "orders");
};
