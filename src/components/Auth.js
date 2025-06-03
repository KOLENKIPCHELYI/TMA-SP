import { useEffect } from 'react';
import { Button } from '@mui/material';

const Auth = () => {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  const handleLogin = () => {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    console.log("User logged in:", user);
    // Здесь отправляем данные пользователя в Firebase
  };

  return (
    <Button onClick={handleLogin} variant="contained">
      Войти через Telegram
    </Button>
  );
};

export default Auth;
