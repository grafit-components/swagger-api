# @grafit/swagger-api

Библиотека для генерации контрактов и Angular-сервисов по спецификации OpenAPI (Swagger) для .NET проектов.

## Установка

```bash
npm install @grafit/swagger-api
```

## Возможности

- Генерация TypeScript-интерфейсов (контрактов) по спецификации OpenAPI
- Создание Angular-сервисов для работы с API
- Интеграция с .NET проектами

## Использование

### Базовое использование

1. Генерация по удаленной спецификации:
```bash
swagger-api --url https://api.example.com/swagger/v1/swagger.json
```

2. Генерация по файлу спецификации и с дополнительными параметрами:
```bash
swagger-api --path ./swagger.json --output ./src/api --datesAsString --contractsPrefix Api
```

3. Генерация общих контрактов из двух файлов спецификации:
```bash
swagger-api -p ./../swagger/web/swagger.json --pathIntersection ./../swagger/mobile/swagger.json --contractsPrefix Lib
```


### Параметры конфигурации


| Option               | Alias   | Type    | Description                                                     | Default     |
|----------------------|---------|---------|-----------------------------------------------------------------|-------------|
| `--help`             | `-h`    | Boolean | Показать help message                                           |             |
| `--output`           | `-o`    | String  | Путь для сохранения сгенерированных файлов                      | `./src/api` |
| `--path`             | `-p`    | String  | Путь к файлу спецификации OpenAPI                               |             |
| `--url`              | `-u`    | String  | URL к файлу спецификации OpenAPI                                |             |
| `--datesAsString`    |         | Boolean | Генерация типов дат как string вместо Date                      | false       |
| `--pathIntersection` |         | String  | Путь в файлу спецификации для получения только общих контрактов |             |
| `--contractsPrefix`  |         | String  | Префикс для сгенерированных контрактов                          |             |


## Интеграция с .NET проектом

1. Убедитесь, что в вашем .NET проекте настроен Swagger/OpenAPI (см. https://github.com/grafit-components/swagger-api/tree/main/sample/api)
2. Добавьте скрипт генерации в `package.json`:

```json
{
  "scripts": {
    "generate-api": "swagger-api -p ./../swagger/swagger.json"
  }
}
```

3. Запустите генерацию:

```bash
npm run generate-api
```

## Лицензия

MIT