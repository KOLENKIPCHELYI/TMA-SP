const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.generateToken = functions.https.onRequest(async (req, res) => {
  const { id, username } = req.body;

  // 1. Создаем или обновляем пользователя в Firestore
  const userRef = admin.firestore().collection('users').doc(String(id));
  await userRef.set({ username }, { merge: true });

  // 2. Генерируем кастомный токен для Firebase Auth
  const token = await admin.auth().createCustomToken(String(id));

  res.json({ token });
});
