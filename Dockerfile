# Use a lightweight Node image
FROM node:18-alpine

# Create and set a working directory inside the container
WORKDIR /app

# Copy package and lock files first (to leverage Docker cache)
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the source code
COPY . .

# Assuming your app serves on port 3000 (or 5173 depending on your config)
EXPOSE 5173

# Start the dev server, binding to all interfaces so Docker can forward ports
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
