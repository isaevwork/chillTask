# TimeKeeper

Простое приложение для учета времени с React фронтендом и Express бэкендом.

## Быстрый старт

```bash
# Установка
npm install

# Запуск
npm run dev
```

## Структура

```
apps/
├── frontend/     # React приложение (порт 3000)
└── backend/      # Express API (порт 3001)
packages/
└── shared/       # Общие типы
```

## API

- `GET /time-entries` - получить все записи
- `POST /time-entries` - создать запись
- `GET /time-entries/current` - текущая сессия
- `POST /time-entries/stop` - остановить сессию

## Команды

```bash
npm run dev              # Запуск фронтенда + бэкенда
npm run dev:frontend     # Только фронтенд
npm run dev:backend      # Только бэкенд
npm run build            # Сборка
npm run lint             # Линтинг
```
