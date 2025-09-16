#!/usr/bin/env node

// 🚀 ChillTask Status Checker (Node.js version)
// Работает на всех платформах

const { execSync } = require('child_process');
const http = require('http');

// Цвета для консоли
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

// Функция для проверки порта
function checkPort(port) {
  try {
    const result = execSync(`lsof -i :${port}`, { encoding: 'utf8', stdio: 'pipe' });
    return result.trim().length > 0;
  } catch (error) {
    return false;
  }
}

// Функция для проверки HTTP endpoint
function checkHttp(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 3000 }, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    });

    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Функция для проверки Docker контейнера
function checkDocker(container) {
  try {
    const result = execSync(`docker ps --format "{{.Names}} {{.Status}}"`, { encoding: 'utf8' });
    return result.includes(container) && result.includes('Up');
  } catch (error) {
    return false;
  }
}

// Функция для проверки процесса
function checkProcess(processName) {
  try {
    const result = execSync(`pgrep -f "${processName}"`, { encoding: 'utf8', stdio: 'pipe' });
    return result.trim().length > 0;
  } catch (error) {
    return false;
  }
}

// Основная функция проверки
async function checkStatus() {
  console.log('🔍 Проверка статуса ChillTask проекта...');
  console.log('================================================\n');

  let totalChecks = 0;
  let passedChecks = 0;

  // Проверка портов
  console.log(`${colors.blue}📡 Проверка портов:${colors.reset}`);
  console.log('-------------------');

  const ports = [
    { port: 3000, service: 'Frontend (Vite)', url: 'http://localhost:3000' },
    { port: 3001, service: 'Backend (NestJS)', url: 'http://localhost:3001' },
    { port: 5432, service: 'PostgreSQL', url: 'localhost:5432' },
    { port: 6379, service: 'Redis', url: 'localhost:6379' },
    { port: 5555, service: 'Prisma Studio', url: 'http://localhost:5555' },
  ];

  for (const { port, service, url } of ports) {
    totalChecks++;
    if (checkPort(port)) {
      console.log(
        `✅ ${colors.green}${service}${colors.reset} - Порт ${port} (${colors.blue}${url}${colors.reset})`,
      );
      passedChecks++;
    } else {
      console.log(`❌ ${colors.red}${service}${colors.reset} - Порт ${port} не запущен`);
    }
  }

  // Проверка HTTP endpoints
  console.log(`\n${colors.blue}🌐 Проверка HTTP endpoints:${colors.reset}`);
  console.log('---------------------------');

  const httpEndpoints = [
    { url: 'http://localhost:3000', service: 'Frontend' },
    { url: 'http://localhost:3001', service: 'Backend API' },
    { url: 'http://localhost:3001/api/docs', service: 'Swagger Docs' },
    { url: 'http://localhost:5555', service: 'Prisma Studio' },
  ];

  for (const { url, service } of httpEndpoints) {
    totalChecks++;
    const isAvailable = await checkHttp(url);
    if (isAvailable) {
      console.log(
        `✅ ${colors.green}${service}${colors.reset} - HTTP доступен (${colors.blue}${url}${colors.reset})`,
      );
      passedChecks++;
    } else {
      console.log(
        `❌ ${colors.red}${service}${colors.reset} - HTTP недоступен (${colors.blue}${url}${colors.reset})`,
      );
    }
  }

  // Проверка Docker контейнеров
  console.log(`\n${colors.blue}🐳 Проверка Docker контейнеров:${colors.reset}`);
  console.log('--------------------------------');

  const containers = [
    { name: 'chilltask-postgres', service: 'PostgreSQL' },
    { name: 'chilltask-redis', service: 'Redis' },
  ];

  for (const { name, service } of containers) {
    totalChecks++;
    if (checkDocker(name)) {
      console.log(`✅ ${colors.green}${service}${colors.reset} - Docker контейнер запущен`);
      passedChecks++;
    } else {
      console.log(`❌ ${colors.red}${service}${colors.reset} - Docker контейнер не запущен`);
    }
  }

  // Проверка процессов
  console.log(`\n${colors.blue}⚙️ Проверка процессов:${colors.reset}`);
  console.log('----------------------');

  const processes = [
    { name: 'vite', service: 'Vite процесс' },
    { name: 'nest', service: 'NestJS процесс' },
    { name: 'turbo', service: 'Turborepo процесс' },
  ];

  for (const { name, service } of processes) {
    totalChecks++;
    if (checkProcess(name)) {
      console.log(`✅ ${colors.green}${service}${colors.reset} - Запущен`);
      passedChecks++;
    } else {
      console.log(`❌ ${colors.red}${service}${colors.reset} - Не запущен`);
    }
  }

  // Сводка
  console.log(`\n${colors.blue}📊 Сводка:${colors.reset}`);
  console.log('==========');
  console.log(
    `Пройдено: ${colors.green}${passedChecks}${colors.reset} из ${colors.blue}${totalChecks}${colors.reset} проверок`,
  );

  if (passedChecks === totalChecks) {
    console.log(`🎉 ${colors.green}Все сервисы работают отлично!${colors.reset}`);
    process.exit(0);
  } else if (passedChecks > totalChecks / 2) {
    console.log(
      `⚠️  ${colors.yellow}Большинство сервисов работают, но есть проблемы${colors.reset}`,
    );
    process.exit(1);
  } else {
    console.log(`💥 ${colors.red}Много сервисов не работают!${colors.reset}`);
    process.exit(2);
  }
}

// Запуск проверки
checkStatus().catch(console.error);
