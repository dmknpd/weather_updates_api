# Weather Updates API

[![Node.js](https://img.shields.io/badge/Node.js-18-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A REST API for weather subscriptions with email confirmation and scheduled updates.

## Description

The Weather Updates API is a service designed to provide users with regular weather updates via email. It allows users to subscribe to weather information for specific cities and receive updates at chosen frequencies (hourly or daily).

**Key Functionalities**:

- Real-time weather data retrieval
- User subscription management (subscribe, confirm, unsubscribe)
- Scheduled weather updates (hourly/daily)
- Token-based security for operations

**Technical Highlights**:

- Sequelize ORM with PostgreSQL
- Nodemailer integration for transactional emails
- Umzug for database migrations
- Dockerized environment
- Comprehensive test suite (92% coverage)

## Features

- **Subscription Workflow**

  - Subscribe with email, city, and frequency
  - Confirmation email with secure token
  - Unsubscribe via tokenized link

- **Scheduled Updates**

  - Hourly and daily cron jobs using `node-cron`
  - Dynamic scheduling based on configuration

- **Weather Integration**

  - Real‑time data from WeatherAPI.com
  - City validation to ensure accuracy

- **Email Delivery**

  - Confirmation, update, and unsubscribe emails via Nodemailer
  - Customizable HTML templates

- **Database & Migrations**

  - Sequelize ORM with PostgreSQL
  - Umzug for migration management

- **Testing**
  - Jest for unit tests
  - Supertest for controller integration tests

## Installation

### Prerequisites

- Docker 20.10+
- A WeatherAPI.com API key
- SMTP credentials (e.g., Gmail)

```bash
git clone https://github.com/dmknpd/weather_updates_api.git
cd weather_updates_api
cp .env.example .env
```

### Edit .env with your credentials

- Required

```bash
# Weather API
WEATHER_API_KEY=your_api_key_here

# Email
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@example.com
MAIL_PASSWORD=your_email_password
```

- Optional

```bash
# Database
DB_NAME=weather_updates_api
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=db
DB_PORT=5432

# App
HOST=http://localhost
PORT=5000
```

### Start dockerized container

```bash
docker compose up
```

## API Endpoints

#### Base URL: http://localhost:5000/

- **Get Weather:**

  - `GET /api/weather?city={city}`
  - Successful Response (200):

    ```json
    {
      "temperature": 15.5,
      "humidity": 60,
      "description": "Partly Cloudy"
    }
    ```

  - Error Responses:

    - `400 Bad Request` - Invalid city parameter:

      ```json
      {
        "error": "Invalid request"
      }
      ```

    - `404 Not Found` - City not found:

      ```json
      {
        "error": "City not found"
      }
      ```

- **Subscribe:**

  - `POST /api/subscribe`
  - Request body:

    ```json
    {
      "email": "user@example.com",
      "city": "London",
      "frequency": "daily"
    }
    ```

    _(The `frequency` field can be either `"daily"` or `"hourly"`)_

  - Successful Response (200):

    ```json
    {
      "message": "Subscription successful. Confirmation email sent."
    }
    ```

  - Error Responses:

    - `400 Bad Request` - Invalid input:

      ```json
      {
        "error": "Invalid input"
      }
      ```

    - `404 Not Found` - Email already subscribed:

      ```json
      {
        "error": "Email already subscribed"
      }
      ```

- **Confirm Subscription:**

  - `GET /api/confirm/:token`
  - Successful Response (200):

    ```json
    {
      "message": "Subscription confirmed successfully"
    }
    ```

  - Error Responses:

    - `400 Bad Request` - Invalid token:

      ```json
      {
        "error": "Invalid token"
      }
      ```

    - `404 Not Found` - Token not found:

      ```json
      {
        "error": "Token not found"
      }
      ```

- **Unsubscribe:**

  - `GET /api/unsubscribe/:token`
  - Successful Response (200):

    ```json
    {
      "message": "Unsubscribed successfully"
    }
    ```

  - Error Responses:

    - `400 Bad Request` - Invalid token:

      ```json
      {
        "error": "Invalid token"
      }
      ```

    - `404 Not Found` - Token not found:

      ```json
      {
        "error": "Token not found"
      }
      ```

## Scheduler

### Cron expressions are defined in config/scheduler.js:

```bash
module.exports = {
  hourly: "0 * * * *",
  daily:  "0 8 * * *"
};
```

Schedulers start automatically on server launch.

## Project Structure

```bash
.
├── config
│   ├── config.js           # Sequelize DB configurations
│   ├── mail.js             # Nodemailer transporter setup
│   ├── scheduler.js        # Cron schedule definitions
│   └── umzug.js            # Migration runner
├── controllers             # Route handlers
│   ├── subscriptionController.js
│   └── weatherController.js
├── migrations               # Sequelize migration files
├── models                   # Sequelize models (index & subscription)
├── routes                   # API routes
│   ├── subscriptionRoutes.js
│   └── weatherRoutes.js
├── scheduler
│   └── scheduler.js         # Node‑cron job setup
├── services                 # Business logic
│   ├── emailService.js
│   ├── subscriptionService.js
│   └── weatherService.js
├── utils
│   ├── cityUtils.js         # City validation
│   └── tokenUtils.js        # Token generation & validation
├── test                     # Jest & Supertest tests
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── index.js                 # Entry point
├── jest.config.js
└── package.json
```

## Testing

## Install dependencies:

```bash
npm install
```

## Run all tests:

```bash
npm test
```
