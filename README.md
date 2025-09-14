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

## 🚀 Быстрый старт

### 1. Клонирование и установка

```bash
git clone <repository-url>
cd chillTask
npm install
```

### 2. Запуск с Docker

```bash
# Запустить базу данных
npm run docker:up

# Настроить схему БД
npm run db:setup

# Запустить приложение
npm run dev
```

### 3. Открыть приложение

- **Frontend**: http://localhost:3000
- **API документация**: http://localhost:3001/api/docs

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
