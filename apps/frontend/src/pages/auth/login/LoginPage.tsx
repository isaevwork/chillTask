import React from 'react';
import cn from 'classnames';
import { AuthLayout } from '@/features/auth/ui/AuthLayout/AuthLayout';
import { LoginForm } from '@/features/auth/ui/LoginForm/LoginForm';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const LoginPage = () => {
  const handleLogin = (data: LoginData) => {
    console.log('Login data:', data);
    // Отправка на API
  };

  return (
    <AuthLayout title="Вход в систему">
      <LoginForm onSubmit={handleLogin} isLoading={false} error="" />
    </AuthLayout>
  );
};
