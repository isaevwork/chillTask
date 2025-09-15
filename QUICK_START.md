# 🚀 Быстрый старт ChillTask

## ⚡ Запуск за 3 команды

```bash
# 1. Установить зависимости
npm install

# 2. Запустить базу данных и настроить схему
npm run db:setup

# 3. Запустить приложение
npm run dev
```

## 🌐 Открыть приложение

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001
- **API Docs**: http://localhost:3001/api/docs
- **Prisma Studio**: http://localhost:5555 (запустить `cd apps/backend && npx prisma studio`)

## 🧪 Тест API

```bash
# Создать пользователя
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","name":"Test User"}'

# Войти в систему
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

## 🔧 Полезные команды

```bash
# Остановить все
npm run docker:down

# Перезапустить
npm run docker:restart

# Очистить все
npm run clean && npm run docker:down
```

## ❓ Проблемы?

Смотрите полную инструкцию в [README.md](README.md) в разделе "Диагностика проблем".
