# 🐳 Docker Setup для ChillTask

## Быстрый старт

### 1. Запуск базы данных

```bash
# Запустить PostgreSQL и Redis
npm run docker:up

# Проверить статус
docker-compose ps
```

### 2. Настройка базы данных

```bash
# Применить схему Prisma к PostgreSQL
npm run db:setup
```

### 3. Запуск приложения

```bash
# Запустить фронтенд и бэкенд
npm run dev
```

## Команды Docker

### Управление контейнерами

```bash
npm run docker:up      # Запустить все сервисы
npm run docker:down    # Остановить все сервисы
npm run docker:restart # Перезапустить сервисы
npm run docker:logs    # Показать логи
```

### Работа с базой данных

```bash
npm run db:setup       # Настроить БД (запустить + применить схему)
npm run db:reset       # Сбросить БД (удалить данные + пересоздать)
```

## Сервисы

### PostgreSQL

- **Порт**: 5432
- **База данных**: chilltask
- **Пользователь**: postgres
- **Пароль**: password

### Redis

- **Порт**: 6379
- **Использование**: кэширование (опционально)

## Подключение к базе данных

```bash
# Через psql
psql -h localhost -p 5432 -U postgres -d chilltask

# Через Docker
docker exec -it chilltask-postgres psql -U postgres -d chilltask
```

## Очистка

```bash
# Остановить и удалить все данные
docker-compose down -v

# Удалить все контейнеры и образы
docker-compose down --rmi all --volumes --remove-orphans
```
