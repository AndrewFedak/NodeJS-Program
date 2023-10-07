# Stage 1: Build the TypeScript application
FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the source code to the container 
# (why copy after npm install, because source code will vary more frequent, 
# thus to keep NPM cached, we will install this before COPY and will take a use of cached layer)
COPY . .

RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine

WORKDIR /app

# Copy only the production-ready files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

RUN npm ci --only=production --ignore-scripts

USER node

EXPOSE 3000
# Define a health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000/health || exit 1

CMD [ "npm", "run", "server" ]