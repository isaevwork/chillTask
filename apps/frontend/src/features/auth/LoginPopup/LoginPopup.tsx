import React from 'react';
import { Popup } from '@/shared/ui/Popup/Popup';
import { LoginForm } from '@/features/auth/ui/LoginForm/LoginForm';
import cls from './LoginPopup.module.scss';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const handleLogin = (data: LoginData) => {
    console.log('Login data:', data);
    // TODO: Интеграция с API
    // После успешного входа:
    onLoginSuccess?.();
    onClose();
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className={cls.loginPopup}>
        <div className={cls.header}>
          <h2 className={cls.title}>Вход в систему</h2>
          <p className={cls.subtitle}>Добро пожаловать обратно!</p>
        </div>

        <div className={cls.content}>
          <LoginForm onSubmit={handleLogin} isLoading={false} error="" />
        </div>

        <div className={cls.footer}>
          <p className={cls.footerText}>
            Нет аккаунта?{' '}
            <button className={cls.linkButton} onClick={onClose}>
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    </Popup>
  );
};
