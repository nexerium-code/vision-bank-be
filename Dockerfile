# Use the latest LTS version of Node.js with Alpine for a lightweight production image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to optimize Docker's build cache
COPY package*.json ./

# Install all dependencies, including dev dependencies (not using --omit=dev)
RUN npm install

# Copy only the necessary source files to the container
COPY src ./src
COPY tsconfig*.json ./

# Build the TypeScript application
RUN npm run build

# Expose the service ports 3000 for API
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "run", "start:prod"]