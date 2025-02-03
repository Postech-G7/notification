FROM node:20
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV PORT=3000
ENV GCP_PROJECT_ID=light-ratio-447800-d5

EXPOSE 3000

# Use production mode
CMD ["npm", "run", "start:prod"]