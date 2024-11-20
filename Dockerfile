# Imagen base para construir la aplicación
FROM node:18-alpine as build

# Directorio de trabajo
WORKDIR /app

# Copia las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm ci

# Copia el código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Imagen ligera para servir la aplicación
FROM nginx:stable-alpine

# Copia los archivos construidos al servidor Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]