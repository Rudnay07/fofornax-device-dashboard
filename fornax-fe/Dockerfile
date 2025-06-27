# ----- 1. LÉPCSŐ: A BUILDER -----
# Angular alkalmazás buildelése
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Angular alkalmazás buildelése
RUN npm run build


# ----- 2. LÉPCSŐ: A VÉGSŐ IMAGE -----
# Statikus fájlok tálalása Nginx-szel
FROM nginx:1.25-alpine

# Alapértelmezett Nginx konfig törlése
RUN rm /etc/nginx/conf.d/default.conf

# Saját Nginx konfig bemásolása
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Lefordított Angular fájlok bemásolása a 'builder'-ből
COPY --from=builder /app/dist/fornax-fe/browser/* /usr/share/nginx/html

# Port megadása
EXPOSE 80
