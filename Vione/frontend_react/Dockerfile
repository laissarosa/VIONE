FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Recebe a URL da API como argumento de build
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Serve os arquivos com Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Config do Nginx para SPA (React Router)
RUN echo 'server { \
  listen 80; \
  location / { \
    root /usr/share/nginx/html; \
    index index.html; \
    try_files $uri $uri/ /index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80