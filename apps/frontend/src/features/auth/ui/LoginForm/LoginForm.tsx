import React, { useState } from 'react';
import cn from 'classnames';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  onSubmit?: (data: LoginData) => void;
  isLoading?: boolean;
  error?: string;
}

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<LoginData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Очищаем ошибку при изменении поля
    if (errors[name as keyof LoginData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginData> = {};

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  return (
    <form className={cls.loginForm} onSubmit={handleSubmit}>
      <div className={cls.formGroup}>
        <label htmlFor="email" className={cls.label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className={cn(cls.input, { [cls.inputError]: errors.email })}
          placeholder="Введите ваш email"
          disabled={isLoading}
        />
        {errors.email && <span className={cls.errorText}>{errors.email}</span>}
      </div>

      <div className={cls.formGroup}>
        <label htmlFor="password" className={cls.label}>
          Пароль
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          className={cn(cls.input, { [cls.inputError]: errors.password })}
          placeholder="Введите ваш пароль"
          disabled={isLoading}
        />
        {errors.password && <span className={cls.errorText}>{errors.password}</span>}
      </div>

      <div className={cls.formGroup}>
        <label className={cls.checkboxLabel}>
          <input
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className={cls.checkbox}
            disabled={isLoading}
          />
          <span className={cls.checkboxText}>Запомнить меня</span>
        </label>
      </div>

      {error && <div className={cls.errorMessage}>{error}</div>}

      <button
        type="submit"
        className={cn(cls.submitButton, { [cls.submitButtonLoading]: isLoading })}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className={cls.spinner} />
            Входим...
          </>
        ) : (
          'Войти'
        )}
      </button>

      <div className={cls.footer}>
        <a href="/auth/forgot-password" className={cls.link}>
          Забыли пароль?
        </a>
      </div>
    </form>
  );
};
