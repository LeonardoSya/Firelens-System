FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN rm -f package-lock.json && rm -rf node_modules
RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine
COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
