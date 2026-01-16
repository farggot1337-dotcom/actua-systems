# Инструкция по настройке Git и загрузке на GitHub

## Шаг 1: Установка Git

Git не установлен на вашем компьютере. Вам нужно его установить:

1. Скачайте Git для Windows: https://git-scm.com/download/win
2. Установите Git, следуя инструкциям установщика
3. После установки перезапустите терминал/командную строку

## Шаг 2: Настройка Git (первый раз)

Откройте терминал и выполните (замените на свои данные):

```bash
git config --global user.name "Ваше Имя"
git config --global user.email "ваш.email@example.com"
```

## Шаг 3: Инициализация репозитория

После установки Git выполните в папке проекта:

```bash
# Инициализация git репозитория
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: Actua Systems website"
```

## Шаг 4: Создание репозитория на GitHub

1. Зайдите на https://github.com
2. Нажмите кнопку "+" в правом верхнем углу
3. Выберите "New repository"
4. Введите название репозитория (например: `actua-systems-website`)
5. Выберите "Public" или "Private"
6. НЕ ставьте галочки на "Initialize with README", "Add .gitignore", "Choose a license"
7. Нажмите "Create repository"

## Шаг 5: Подключение к GitHub

После создания репозитория GitHub покажет инструкции. Выполните:

```bash
# Добавьте удаленный репозиторий (замените YOUR_USERNAME и REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Переименуйте ветку в main (если нужно)
git branch -M main

# Загрузите код на GitHub
git push -u origin main
```

## Альтернативный способ (через GitHub Desktop)

Если не хотите использовать командную строку:

1. Скачайте GitHub Desktop: https://desktop.github.com/
2. Установите и войдите в свой аккаунт GitHub
3. В GitHub Desktop: File → Add Local Repository
4. Выберите папку проекта
5. Нажмите "Publish repository" для создания нового репозитория на GitHub

## Полезные команды Git

```bash
# Проверить статус
git status

# Добавить изменения
git add .

# Сделать коммит
git commit -m "Описание изменений"

# Загрузить на GitHub
git push

# Скачать изменения с GitHub
git pull
```
