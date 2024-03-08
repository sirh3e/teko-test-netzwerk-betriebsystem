# Stage 1: Build
FROM node:21 as builder
WORKDIR /usr/src/app
COPY app/package*.json ./
RUN npm install
COPY app/src/* ./src/
RUN npm install
RUN npm run build

# Stage 2: Production environment
FROM node:21-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3000
CMD [ "node", "dist/bundle.js" ]