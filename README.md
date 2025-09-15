# 🚀 ChillTask

Современное приложение для учета времени с полным стеком технологий.

## ✨ Особенности

- 🎯 **React 19** - последняя версия с новыми возможностями
- ⚡ **Vite** - молниеносная сборка и HMR
- 🔒 **JWT аутентификация** - безопасный вход
- 🗄️ **PostgreSQL** - надежная база данных
- 🐳 **Docker** - изолированная среда разработки
- 📱 **Responsive** - адаптивный дизайн
- 🎨 **SCSS Modules** - изолированные стили
- 📚 **Swagger** - интерактивная API документация

## 🏗️ Архитектура

```
chilltask-monorepo/
├── 🎯 Frontend (React SPA)     # http://localhost:3000
├── ⚙️ Backend (NestJS API)     # http://localhost:3001
├── 📦 Shared Package           # Общие типы
└── 🐳 Docker Services
    ├── PostgreSQL (порт 5432)
    └── Redis (порт 6379)
```

## 🚀 Полная инструкция по запуску

### 📋 Предварительные требования

- **Node.js** 18+ (рекомендуется 22)
- **npm** 10+
- **Docker** и **Docker Compose**
- **Git**

### 🔧 Установка и настройка

#### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd chillTask
```

#### 2. Установка зависимостей

```bash
# Установка всех зависимостей для monorepo
npm install
```

#### 3. Настройка переменных окружения

```bash
# Переменные уже настроены в apps/backend/.env
# DATABASE_URL="postgresql://postgres:password@localhost:5432/chilltask?schema=public"
# JWT_SECRET="your-super-secret-jwt-key-here"
# PORT=3001
# NODE_ENV=development
```

### 🐳 Запуск с Docker

#### 1. Запуск базы данных

```bash
# Запустить PostgreSQL и Redis
npm run docker:up
```

**Проверка:**

```bash
# Проверить, что контейнеры запущены
docker ps
```

#### 2. Настройка базы данных

```bash
# Создать схему базы данных
npm run db:setup
```

**Что происходит:**

- Запускается PostgreSQL
- Создается база данных `chilltask`
- Применяется Prisma схема
- Генерируется Prisma клиент

**Проверка:**

```bash
# Проверить, что база создана
docker exec chilltask-postgres psql -U postgres -c "\l"
```

#### 3. Запуск приложения

```bash
# Запустить frontend и backend
npm run dev
```

**Альтернативно:**

```bash
# Только frontend
npm run dev:frontend

# Только backend (в отдельном терминале)
cd apps/backend
npm run start:dev
```

### 🌐 Проверка работы

#### 1. Frontend

- Откройте: http://localhost:3000
- Должна загрузиться главная страница

#### 2. Backend API

- Откройте: http://localhost:3001
- Должен вернуться: `{"message":"ChillTask API is running!"}`

#### 3. API документация

- Откройте: http://localhost:3001/api/docs
- Должна загрузиться Swagger UI

#### 4. База данных (Prisma Studio)

```bash
# В отдельном терминале
cd apps/backend
npx prisma studio
```

- Откройте: http://localhost:5555
- Должна загрузиться Prisma Studio

### 🧪 Тестирование API

#### 1. Регистрация пользователя

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","name":"Test User"}'
```

#### 2. Вход в систему

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

#### 3. Проверка защищенного endpoint

```bash
# Используйте токен из ответа login
curl -X GET http://localhost:3001/protected \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 🔍 Диагностика проблем

#### 1. Проверка портов

```bash
# Проверить, что порты свободны
lsof -i :3000  # Frontend
lsof -i :3001  # Backend
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis
```

#### 2. Проверка Docker

```bash
# Статус контейнеров
docker ps

# Логи контейнеров
npm run docker:logs

# Перезапуск контейнеров
npm run docker:restart
```

#### 3. Проверка базы данных

```bash
# Подключение к PostgreSQL
docker exec -it chilltask-postgres psql -U postgres -d chilltask

# Просмотр таблиц
\dt

# Просмотр данных
SELECT * FROM users;

# Выход
\q
```

#### 4. Очистка и перезапуск

```bash
# Полная очистка
npm run clean
npm run docker:down
docker system prune -f

# Перезапуск с нуля
npm run docker:up
npm run db:setup
npm run dev
```

## 🛠️ Технологический стек

### Frontend

- **React 19.1.0** - UI библиотека
- **TypeScript 5.8.3** - строгая типизация
- **Vite 6.3.5** - быстрый сборщик
- **React Router 7.6.2** - клиентский роутинг
- **SCSS Modules** - изолированные стили
- **Feature-Sliced Design** - архитектура

### Backend

- **NestJS** - Node.js фреймворк
- **TypeScript** - типизация
- **Prisma** - современный ORM
- **JWT** - аутентификация
- **bcryptjs** - хеширование паролей
- **Swagger** - API документация

### Database & Infrastructure

- **PostgreSQL 15** - реляционная БД
- **Redis 7** - кэширование
- **Docker** - контейнеризация
- **Turborepo** - monorepo менеджер

## 📋 Команды

### Разработка

```bash
npm run dev              # Запуск всех сервисов
npm run dev:frontend     # Только фронтенд
npm run build            # Сборка всех приложений
npm run lint             # Линтинг кода
npm run clean            # Очистка
```

### Docker

```bash
npm run docker:up        # Запустить Docker сервисы
npm run docker:down      # Остановить Docker сервисы
npm run docker:logs      # Показать логи
npm run docker:restart   # Перезапустить сервисы
```

### База данных

```bash
npm run db:setup         # Настроить БД (запустить + схема)
npm run db:reset         # Сбросить БД (удалить + пересоздать)
```

## 🌐 API Endpoints

### Аутентификация

- `POST /auth/register` - Регистрация
- `POST /auth/login` - Вход в систему
- `GET /auth/profile` - Профиль пользователя

### Общие

- `GET /` - Проверка работы API
- `GET /protected` - Защищенный endpoint
- `GET /api/docs` - Swagger документация

## 🗄️ База данных

### Модель User

```sql
CREATE TABLE users (
  id        TEXT PRIMARY KEY,
  email     TEXT UNIQUE NOT NULL,
  password  TEXT NOT NULL,
  name      TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Разработка

### Структура проекта

```
src/
├── app/           # Инициализация приложения
├── pages/         # Страницы приложения
├── widgets/       # Крупные UI блоки
├── features/      # Бизнес-функции
└── shared/        # Переиспользуемые ресурсы
```

### Переменные окружения

```bash
# Backend (.env)
DATABASE_URL="postgresql://postgres:password@localhost:5432/chilltask?schema=public"
JWT_SECRET="your-secret-key"
PORT=3001
NODE_ENV=development
```

## 🚀 Деплой

### Production сборка

```bash
npm run build
```

### Docker Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 Документация

- [Docker Setup](DOCKER.md) - подробная настройка Docker
- [API Documentation](http://localhost:3001/api/docs) - Swagger UI
- [Architecture Patterns](.cursor/rules/architecture-patterns.md) - архитектурные паттерны

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License.

## 👨‍💻 Автор

Создано с ❤️ для эффективного учета времени.
