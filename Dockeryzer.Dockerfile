# Use the latest LTS version of Node.js as the base image for building
FROM node:alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install production dependencies only
RUN yarn install --production

# Copy the rest of the application source code
COPY . .

# Use a lightweight image to run the application
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the production dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the application source code from the builder stage
COPY --from=builder /app .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "src/index.js"]

# Example command to run the application
# docker run -d -p 3000:3000 --env-file .env <image_name>