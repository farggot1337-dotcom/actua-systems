# Исправление: not a git repository

## Проблема
Git говорит, что это не git репозиторий. Нужно сначала инициализировать.

## Решение: Выполните команды по порядку

### В Git Bash выполните:

1. **Убедитесь, что вы в правильной папке:**
```bash
pwd
```
Должно показать: `/c/Users/fargg/OneDrive/Desktop/sim kursor`

Если нет - перейдите:
```bash
cd "/c/Users/fargg/OneDrive/Desktop/sim kursor"
```

2. **Инициализируйте git репозиторий:**
```bash
git init
```

3. **Добавьте все файлы:**
```bash
git add .
```

4. **Сделайте первый коммит:**
```bash
git commit -m "Initial commit: Actua Systems website"
```

5. **Подключите GitHub (замените на ваши данные):**
```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

6. **Переименуйте ветку:**
```bash
git branch -M main
```

7. **Загрузите на GitHub:**
```bash
git push -u origin main
```

## Если remote уже существует:

Если увидите "remote origin already exists", выполните:
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```
