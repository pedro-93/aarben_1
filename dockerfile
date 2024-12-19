# Usa una imagen oficial de Node.js como base
FROM node:18 AS build

# Configurar directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json para instalar las dependencias primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Construir la aplicación Angular
RUN npm run build --prod

# Servir la aplicación con un servidor web ligero
FROM nginx:alpine
COPY --from=build /app/dist/aarben /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
