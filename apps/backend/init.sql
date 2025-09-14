-- Инициализация базы данных ChillTask
-- Этот файл выполняется при первом запуске PostgreSQL контейнера

-- Создаем расширения если нужно
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Создаем схему если нужно
-- CREATE SCHEMA IF NOT EXISTS chilltask;

-- Настраиваем права доступа
GRANT ALL PRIVILEGES ON DATABASE chilltask TO postgres;

-- Логируем успешную инициализацию
DO $$
BEGIN
    RAISE NOTICE 'ChillTask database initialized successfully!';
END $$;
