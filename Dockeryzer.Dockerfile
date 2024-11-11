# Use the latest LTS version of Node.js as the base image for building
FROM node:alpine AS builder

# Set the working directory
WORKDIR /app

# Copy only the necessary files for installing dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the application (if applicable, otherwise this step can be omitted)
# RUN yarn build

# Use a minimal Node.js image for the production environment
FROM node:alpine AS production

# Set the working directory
WORKDIR /app

# Copy the node_modules from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the application files
COPY --from=builder /app .

# Expose the application port
EXPOSE 3000

# Set the environment variable for production
ENV NODE_ENV=production

# Start the application
CMD ["node", "src/index.js"]

# Example command to run the application
# docker run -p 3000:3000 --env-file .env <image_name>