# ChillTask Backend

Простой бэкенд для аутентификации пользователей.

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка базы данных

```bash
# Создайте .env файл
cp env.example .env

# Отредактируйте DATABASE_URL в .env
# DATABASE_URL="postgresql://username:password@localhost:5432/chilltask?schema=public"

# Создайте базу данных
npm run db:push
```

### 3. Запуск

```bash
# Разработка
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 📚 API Endpoints

### Аутентификация

- `POST /auth/register` - Регистрация
- `POST /auth/login` - Вход
- `GET /auth/profile` - Профиль (требует токен)

### Общие

- `GET /` - Проверка работы API
- `GET /protected` - Защищенный endpoint (требует токен)
- `GET /api/docs` - Swagger документация

## 🔧 Команды

```bash
npm run start:dev    # Запуск в режиме разработки
npm run build        # Сборка
npm run db:push      # Синхронизация с БД
npm run db:generate  # Генерация Prisma клиента
```

## 🗄️ База данных

Используется PostgreSQL с Prisma ORM.

### Модель User

- `id` - Уникальный идентификатор
- `email` - Email (уникальный)
- `password` - Хешированный пароль
- `name` - Имя пользователя (опционально)
- `createdAt` - Дата создания
- `updatedAt` - Дата обновления
