# NestJS Video Upload API

This is a simple API using NestJS framework to upload videos.

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start:dev
```

## Test

```bash
$ npm run test
```

## API

### Upload Video

```bash
POST http://localhost:3000/upload/video
Headers: Content-Type: multipart/form-data
Body: Video file
Authorization: Bearer <token>
``` 