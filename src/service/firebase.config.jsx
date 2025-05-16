import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBK_ZEbIQApfBZ8H17NbXqQGurMpixgbEI",
  authDomain: "ai-trip-planner-2f3c7.firebaseapp.com",
  projectId: "ai-trip-planner-2f3c7",
  storageBucket: "ai-trip-planner-2f3c7.firebasestorage.app",
  messagingSenderId: "560151250381",
  appId: "1:560151250381:web:b9c737cec903771e7bf084",
  measurementId: "G-X6RW2E4K6M",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
