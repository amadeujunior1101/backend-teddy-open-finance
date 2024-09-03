# Teddy Open Finance

Este projeto utiliza as seguintes tecnologias:

- Node.js
- Typescript
- Express
- Class-validator
- Swagger
- Redis
- Postgres
- Typeorm
- Docker

## Executando a Aplicação

- No terminal:

1 - clone do repositorio: 

  git clone https://github.com/amadeujunior1101/backend-teddy-open-finance

2 - acesse a pasta:

  cd backend-teddy-open-finance

3 - baixe as dependências:

  yarn ou npm i

4 - crie o arquivo .env na raíz do projeto e set os valores referentes logo abaixo:

	  PGHOST=postgres
    PGUSER=open-finance
    PGPASSWORD=open-finance
    PGDATABASE=open-finance
    PGPORT=5432

    BASE_URL=http://localhost:3000

    SECRET_JWT=hi2hbdowmuy-GGtdsjoeiYfTRRlbs
    TOKEN_EXPIRES_IN=1d

    REDIS_URL=redis://redis:6379 # without docker use: redis://localhost:6379

5 - execute a aplicação no docker:

 - docker-compose up
