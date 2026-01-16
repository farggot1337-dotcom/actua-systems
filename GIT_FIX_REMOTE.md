# Исправление ошибки "remote origin already exists"

## Решение 1: Удалить и добавить заново

Выполните в Git Bash:

```bash
# Удалить существующий remote
git remote remove origin

# Добавить правильный remote (замените на ваши данные)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Проверить, что всё правильно
git remote -v
```

## Решение 2: Обновить URL существующего remote

```bash
# Обновить URL существующего remote (замените на ваши данные)
git remote set-url origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Проверить
git remote -v
```

## После исправления:

```bash
# Переименовать ветку (если нужно)
git branch -M main

# Загрузить код
git push -u origin main
```
