#!/bin/bash

# 🚀 ChillTask Status Checker
# Проверяет статус всех сервисов проекта

echo "🔍 Проверка статуса ChillTask проекта..."
echo "================================================"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для проверки порта
check_port() {
    local port=$1
    local service=$2
    local url=$3
    
    if lsof -i :$port >/dev/null 2>&1; then
        echo -e "✅ ${GREEN}$service${NC} - Порт $port (${BLUE}$url${NC})"
        return 0
    else
        echo -e "❌ ${RED}$service${NC} - Порт $port не запущен"
        return 1
    fi
}

# Функция для проверки HTTP endpoint
check_http() {
    local url=$1
    local service=$2
    
    if curl -s --connect-timeout 3 "$url" >/dev/null 2>&1; then
        echo -e "✅ ${GREEN}$service${NC} - HTTP доступен (${BLUE}$url${NC})"
        return 0
    else
        echo -e "❌ ${RED}$service${NC} - HTTP недоступен (${BLUE}$url${NC})"
        return 1
    fi
}

# Функция для проверки Docker контейнера
check_docker() {
    local container=$1
    local service=$2
    
    if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "$container.*Up"; then
        echo -e "✅ ${GREEN}$service${NC} - Docker контейнер запущен"
        return 0
    else
        echo -e "❌ ${RED}$service${NC} - Docker контейнер не запущен"
        return 1
    fi
}

echo -e "\n${BLUE}📡 Проверка портов:${NC}"
echo "-------------------"
check_port 3000 "Frontend (Vite)"
check_port 3001 "Backend (NestJS)"
check_port 5432 "PostgreSQL"
check_port 6379 "Redis"
check_port 5555 "Prisma Studio"

echo -e "\n${BLUE}🌐 Проверка HTTP endpoints:${NC}"
echo "---------------------------"
check_http "http://localhost:3000" "Frontend"
check_http "http://localhost:3001" "Backend API"
check_http "http://localhost:3001/api/docs" "Swagger Docs"
check_http "http://localhost:5555" "Prisma Studio"

echo -e "\n${BLUE}🐳 Проверка Docker контейнеров:${NC}"
echo "--------------------------------"
check_docker "chilltask-postgres" "PostgreSQL"
check_docker "chilltask-redis" "Redis"

echo -e "\n${BLUE}⚙️ Проверка процессов:${NC}"
echo "----------------------"
if pgrep -f "vite" >/dev/null; then
    echo -e "✅ ${GREEN}Vite процесс${NC} - Запущен"
else
    echo -e "❌ ${RED}Vite процесс${NC} - Не запущен"
fi

if pgrep -f "nest" >/dev/null; then
    echo -e "✅ ${GREEN}NestJS процесс${NC} - Запущен"
else
    echo -e "❌ ${RED}NestJS процесс${NC} - Не запущен"
fi

if pgrep -f "turbo" >/dev/null; then
    echo -e "✅ ${GREEN}Turborepo процесс${NC} - Запущен"
else
    echo -e "❌ ${RED}Turborepo процесс${NC} - Не запущен"
fi

echo -e "\n${BLUE}📊 Сводка:${NC}"
echo "=========="

# Подсчет успешных проверок
total_checks=0
passed_checks=0

# Проверки портов
for port in 3000 3001 5432 6379 5555; do
    total_checks=$((total_checks + 1))
    if lsof -i :$port >/dev/null 2>&1; then
        passed_checks=$((passed_checks + 1))
    fi
done

# Проверки HTTP
for url in "http://localhost:3000" "http://localhost:3001" "http://localhost:3001/api/docs" "http://localhost:5555"; do
    total_checks=$((total_checks + 1))
    if curl -s --connect-timeout 3 "$url" >/dev/null 2>&1; then
        passed_checks=$((passed_checks + 1))
    fi
done

# Проверки Docker
for container in "chilltask-postgres" "chilltask-redis"; do
    total_checks=$((total_checks + 1))
    if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "$container.*Up"; then
        passed_checks=$((passed_checks + 1))
    fi
done

# Проверки процессов
for process in "vite" "nest" "turbo"; do
    total_checks=$((total_checks + 1))
    if pgrep -f "$process" >/dev/null; then
        passed_checks=$((passed_checks + 1))
    fi
done

echo -e "Пройдено: ${GREEN}$passed_checks${NC} из ${BLUE}$total_checks${NC} проверок"

if [ $passed_checks -eq $total_checks ]; then
    echo -e "🎉 ${GREEN}Все сервисы работают отлично!${NC}"
    exit 0
elif [ $passed_checks -gt $((total_checks / 2)) ]; then
    echo -e "⚠️  ${YELLOW}Большинство сервисов работают, но есть проблемы${NC}"
    exit 1
else
    echo -e "💥 ${RED}Много сервисов не работают!${NC}"
    exit 2
fi
