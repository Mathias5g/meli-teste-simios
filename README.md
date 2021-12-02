## Teste Mercado Livre

    API desenvolvida para a realização do teste simio.

- ### Requerimentos
    - [Node.js](https://nodejs.org/)
    - [NPM](https://npmjs.org/) 
    - [Yarn](https://yarnpkg.com/) (Opcional)

## Instalação do projeto

    $ git clone https://github.com/Mathias5g/meli-teste-simios.git PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ npm install ou yarn install

## Como rodar o projeto
    $ yarn run dev # ou `npm run dev

## Iniciando o banco de dados 
    $ npx prisma migrate dev

## Testes
    $ yarn jest
    $ yarn jest --coverage

## Testar Api localmente [Postman](https://www.postman.com/downloads/)
## Rotas
    [GET] localhost:4000/stats
    [POST] localhost:4000/simian
Body:
- Simio
```json
{
    "dna": ["CTGAGA", "CTAAGC", "TATTGT", "AGAGGG", "CCCCTA", "TCACTG"]
}
```
- Humano
```json
{
    "dna": ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"]
}
```

## Schema Postman
```json
{
	"info": {
      "_postman_id": "9883646a-0e43-4d01-bfec-cfc004cb5fb1",
      "name": "API Simeo MELI",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
      {
        "name": "teste-dna",
        "request": {
          "method": "POST",
          "header": [],
          "body": {
            "mode": "raw",
            "raw": "{\r\n    \"dna\": [\r\n    \"CTGAGA\",\r\n    \"CTAAGC\",\r\n    \"TATTGT\",\r\n    \"AGAGGG\",\r\n    \"CCCCTA\",\r\n    \"TCACTG\"\r\n]\r\n}",
            "options": {
              "raw": {
                "language": "json"
              }
            }
          },
          "url": {
            "raw": "http://localhost:4000/simian",
            "protocol": "http",
            "host": [
              "localhost"
            ],
            "port": "4000",
            "path": [
              "simian"
            ],
            "query": [
              {
                "key": "dna",
                "value": "teste",
                "disabled": true
              }
            ]
          }
        },
        "response": []
		},
		{
          "name": "stats",
          "request": {
            "method": "GET",
            "header": [],
            "url": null
          },
          "response": []
		}
	]
}
```

## Testar AWS
## - Routes
	[GET]	3.19.79.33:4000/stats
	[POST]	3.19.79.33:4000/simian
Body:
- Simio
```json
{
    "dna": ["CTGAGA", "CTAAGC", "TATTGT", "AGAGGG", "CCCCTA", "TCACTG"]
}
```
- Humano
```json
{
    "dna": ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"]
}
```

## Bibliotecas utilizadas
    ["express": "^4.17.1"]
    ["object-hash": "^2.2.0"]
    ["prisma": "^3.6.0"]
    ["ts-node-dev": "^1.1.8"]
    ["typescript": "^4.5.2"]