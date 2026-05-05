FROM node:22-slim

# Dependências do sistema necessárias para o Prisma
RUN apt-get update -y && \
    apt-get install -y openssl libssl-dev curl && \
    apt-get clean

WORKDIR /app

# Copia dependências primeiro (cache do Docker)
COPY package*.json ./
RUN npm install

# Copia o resto do projeto
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

EXPOSE 3000

# Script de entrada que aguarda o banco, migra e inicia
CMD sh -c "\
  echo 'Waiting for database...' && \
  until npx prisma db push --accept-data-loss 2>/dev/null; do \
    echo 'Database not ready, retrying in 3s...' && sleep 3; \
  done && \
  echo 'Running seed...' && \
  npx prisma db seed && \
  echo 'Starting server...' && \
  node src/server.js"