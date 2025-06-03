import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Включаем оффлайн-режим
enableIndexedDbPersistence(db).catch((err) => {
  console.error("Оффлайн-режим не поддерживается: ", err);
});

export { db, auth };

import { signInWithCustomToken } from "firebase/auth";

export const loginWithTelegram = async (telegramUser) => {
  // 1. Отправляем Telegram-данные на ваш сервер (например, Firebase Functions)
  const response = await fetch('https://your-firebase-function-url/generateToken', {
    method: 'POST',
    body: JSON.stringify({
      id: telegramUser.id,
      username: telegramUser.username
    })
  });
  const { token } = await response.json();

  // 2. Входим в Firebase с кастомным токеном
  await signInWithCustomToken(auth, token);
};
