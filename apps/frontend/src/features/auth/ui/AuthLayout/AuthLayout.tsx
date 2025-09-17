import cn from 'classnames';
import cls from './AuthLayout.module.scss';
import { FC } from 'react';

interface AuthLayoutProps {
  children: React.ReactNode; // LoginForm или RegisterForm
  title: string; // "Вход в систему" или "Регистрация"
  subtitle?: string; // Дополнительное описание
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className={cls.authLayout}>
      {/* Логотип/брендинг */}
      <div className={cls.header}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      {/* Форма аутентификации */}
      <div className={cls.content}>
        {children} {/* LoginForm или RegisterForm */}
      </div>

      {/* Футер с дополнительной информацией */}
      <div className={cls.footer}>
        <p>
          Уже есть аккаунт? <Link to="/auth/login">Войти</Link>
        </p>
        <p>
          Нет аккаунта? <Link to="/auth/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};
